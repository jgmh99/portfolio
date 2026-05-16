import "./globals.css";
import Nav from "@/components/Nav";
import StarfieldBackground from "@/components/StarfieldBackground";

export const metadata = {
  title: "Jegal Minhyuk Portfolio",
  description: "이직용 포트폴리오 사이트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <StarfieldBackground />
        <div className="site-shell">
          <Nav />
          <main className="container page-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
