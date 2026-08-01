import type {Metadata} from "next";
import "../src/styles.css";
import "../src/tribute.css";
import "../src/tribute-contrast.css";
import "../src/community.css";
import "../src/download-choice.css";
import "../src/design-system-v2.css";

export const metadata:Metadata={
 title:"DubbinTool — AI Script Shorts & AI Dubbing Studio",
 description:"Dán link để tạo video Shorts bằng AI, hoặc trích xuất phụ đề, dịch, lồng tiếng và render video trong một studio duy nhất cho Windows.",
 metadataBase:new URL("https://dubbintool.io.vn"),
 alternates:{canonical:"/"},
 manifest:"/manifest.webmanifest",
 openGraph:{title:"DubbinTool — AI Script Shorts & AI Dubbing Studio",description:"Từ link video đến Shorts hoàn chỉnh. Từ video gốc đến bản dịch và lồng tiếng sẵn sàng đăng.",url:"https://dubbintool.io.vn",siteName:"DubbinTool",locale:"vi_VN",type:"website",images:[{url:"/og-v110.png",width:1731,height:909,alt:"DubbinTool 1.1.0 — AI Script Shorts"}]},
 twitter:{card:"summary_large_image",title:"DubbinTool — AI Script Shorts & AI Dubbing Studio",description:"Dán link video. AI viết kịch bản, tạo giọng đọc và dựng Shorts hoàn chỉnh.",images:["/og-v110.png"]},
 icons:{icon:[{url:"/assets/favicon.ico"},{url:"/assets/favicon.png",type:"image/png"}],apple:"/assets/icon.png"}
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="vi"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet"/></head><body>{children}</body></html>;
}
