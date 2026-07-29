import type {Metadata} from "next";
import "../src/styles.css";
import "../src/brand-pricing.css";
import "../src/editorial-refresh.css";
import "../src/tribute.css";

export const metadata:Metadata={title:"DubbinTool — AI Dubbing Studio",description:"OCR, dịch, lồng tiếng và render video trong một studio.",icons:{icon:[{url:"/assets/favicon.ico"},{url:"/assets/favicon.png",type:"image/png"}],apple:"/assets/icon.png"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="vi"><body>{children}</body></html>}
