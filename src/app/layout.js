import "./globals.css";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Jegal Minhyuk Portfolio",
  description: "이직용 포트폴리오 사이트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Nav />
        <main className="container page-content">{children}</main>
      </body>
    </html>
  );
}
