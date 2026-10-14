import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Facebook",
  description: "Mini Facebook, un réseau social étudiant.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-4xl p-6">
          <header className="py-4 text-center text-xl font-bold">
            Mini Facebook
          </header>
          <main className="py-12">{children}</main>
          <footer className="flex flex-wrap justify-center gap-5 py-5 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-white">
              Confidentialité
            </Link>
            <Link href="/terms" className="hover:text-white">
              Conditions d’utilisation
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
