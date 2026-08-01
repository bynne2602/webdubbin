const LICENSE_SERVER = "https://dubbintool-license.bynne2602.workers.dev";
const ALLOWED_MODELS = new Set([
  "google/google-tts",
  "google/gemini-2.5-flash-tts",
]);

function json(payload: unknown, status = 200) {
  return Response.json(payload, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const licenseKey = String(body.licenseKey || "").trim();
    const hwid = String(body.hwid || "").trim();
    if (!licenseKey || !hwid) return json({ error: "Thiếu thông tin xác thực DubbinTool." }, 401);
    const verification = await fetch(`${LICENSE_SERVER}/api/tts/authorize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: licenseKey, hwid }),
    });
    const verified = await verification.json().catch(() => ({})) as { valid?: boolean; reason?: string };
    if (!verification.ok || !verified.valid) return json({ error: verified.reason || "License DubbinTool không hợp lệ." }, verification.status === 429 ? 429 : 403);

    const apiKey = String(process.env.BEEKNOEE_API_KEY || "").trim();
    if (!apiKey) return json({ error: "Dịch vụ Google TTS chưa được cấu hình." }, 503);
    const model = String(body.model || "google/google-tts");
    const voice = String(body.voice || "vi").slice(0, 80);
    const input = String(body.input || "").replace(/\s+/g, " ").trim();
    if (!ALLOWED_MODELS.has(model)) return json({ error: "Model TTS không được phép." }, 400);
    if (!input || input.length > 4_900) return json({ error: "Nội dung TTS phải có từ 1 đến 4.900 ký tự." }, 400);

    const upstream = await fetch("https://platform.beeknoee.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `dubbin-${crypto.randomUUID()}`,
      },
      body: JSON.stringify({ model, voice, input, response_format: "mp3" }),
      signal: AbortSignal.timeout(180_000),
    });
    if (!upstream.ok) {
      return json({ error: "Google TTS tạm thời không khả dụng. Vui lòng thử lại sau." }, 502);
    }
    const audio = await upstream.arrayBuffer();
    if (audio.byteLength < 256) return json({ error: "Google TTS trả về audio rỗng." }, 502);
    return new Response(audio, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "audio/mpeg",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error: any) {
    return json({ error: error?.message || "Không thể tạo giọng đọc." }, 500);
  }
}
