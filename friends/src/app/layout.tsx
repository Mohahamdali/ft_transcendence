import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { FriendsProvider } from "@/context/FriendsContext";

export const metadata: Metadata = {
  title: "Mini Facebook",
  description: "Friends and profile frontend demo",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <FriendsProvider>
          <AppHeader />
          <Sidebar />
          <div className="pt-[58px] lg:pl-[270px]">{children}</div>
        </FriendsProvider>
      </body>
    </html>
  );
}
