import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ft_transcendence — Mini Facebook",
  description: "Student social network prototype for the 42 curriculum",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="mx-auto max-w-4xl p-6">
          <header className="border-b border-slate-700 py-4 text-xl font-bold">
            Mini Facebook{" "}
            <span className="text-sm font-normal text-slate-400">v0.0.1</span>
          </header>
          <main className="py-12">{children}</main>
          <footer className="flex gap-5 border-t border-slate-700 py-5 text-sm text-slate-400">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
