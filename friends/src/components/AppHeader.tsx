"use client";

import Link from "next/link";
import { Bell, Home, Menu, MessageCircle, Search, Store, Users, Video, Grid3X3 } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[58px] items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Link href="/friends" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0866ff] text-2xl font-bold text-white">f</Link>
        <div className="hidden h-10 w-[240px] items-center gap-2 rounded-full bg-[#f0f2f5] px-3 sm:flex">
          <Search size={17} className="text-gray-500" />
          <input className="w-full bg-transparent text-sm outline-none" placeholder="Rechercher sur Facebook" />
        </div>
      </div>
      <nav className="absolute left-1/2 hidden h-full -translate-x-1/2 items-center gap-2 md:flex">
        <HeaderLink href="/friends" icon={<Home size={22} />} />
        <HeaderLink href="/friends" icon={<Video size={22} />} />
        <HeaderLink href="/friends" active icon={<Users size={22} />} />
        <HeaderLink href="/friends" icon={<Store size={22} />} />
        <HeaderLink href="/friends" icon={<Grid3X3 size={21} />} />
      </nav>
      <div className="flex items-center gap-2 text-gray-700">
        <button className="rounded-full bg-gray-100 p-2"><Menu size={19} /></button>
        <button className="rounded-full bg-gray-100 p-2"><MessageCircle size={19} /></button>
        <button className="rounded-full bg-gray-100 p-2"><Bell size={19} /></button>
        <Link href="/profile/me" className="h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-gray-200">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="My profile" className="h-full w-full object-cover" />
        </Link>
      </div>
    </header>
  );
}

function HeaderLink({ href, icon, active = false }: { href: string; icon: React.ReactNode; active?: boolean }) {
  return <Link href={href} className={`flex h-full w-[82px] items-center justify-center border-b-[3px] ${active ? "border-[#0866ff] text-[#0866ff]" : "border-transparent text-gray-500 hover:bg-gray-50"}`}>{icon}</Link>;
}
