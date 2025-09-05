import "./globals.css";
import HeaderMenu from "@/components/HeaderMenu/HeaderMenu";
import Providers from "@/components/Providers";

export const metadata = {
  title: "MyBotApp",
  description: "Telegram bot builder",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>
        <Providers>
          <HeaderMenu />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
