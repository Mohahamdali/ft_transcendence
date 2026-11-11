"use client";

import Link from "next/link";
import { CalendarDays, ChevronRight, Contact, Settings, Users, UserRoundPlus, UsersRound } from "lucide-react";

const items = [
  { label: "Accueil", icon: Users, href: "/friends" },
  { label: "Invitations", icon: UserRoundPlus, href: "/friends#invitations" },
  { label: "Suggestions", icon: Contact, href: "/friends#suggestions" },
  { label: "Tout(e)s les ami(e)s", icon: UsersRound, href: "/friends#all-friends" },
  { label: "Anniversaires", icon: CalendarDays, href: "/friends" },
];

export default function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-[58px] hidden w-[270px] overflow-y-auto border-r border-gray-200 bg-white p-3 lg:block">
      <div className="mb-3 flex items-center justify-between px-2">
        <h2 className="text-xl font-bold">Ami(e)s</h2>
        <button className="rounded-full bg-gray-100 p-2"><Settings size={17} /></button>
      </div>
      <div className="space-y-1">
        {items.map(({ label, icon: Icon, href }, index) => (
          <Link key={label} href={href} className={`flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm hover:bg-gray-100 ${index === 0 ? "bg-[#e7f3ff] font-semibold text-[#0866ff]" : ""}`}>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200"><Icon size={17} /></span>
            <span className="flex-1">{label}</span>
            {index > 0 && <ChevronRight size={16} className="text-gray-500" />}
          </Link>
        ))}
      </div>
      <div className="mt-6 border-t pt-4 text-xs text-gray-500">Raccourcis</div>
      <Link href="/profile/me" className="mt-3 flex items-center gap-3 rounded-lg p-2 hover:bg-gray-100">
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" className="h-8 w-8 rounded-full object-cover" alt="" />
        <span className="text-sm font-medium">Mon profil</span>
      </Link>
    </aside>
  );
}
