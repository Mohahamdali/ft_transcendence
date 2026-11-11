"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronDown, Users } from "lucide-react";
import PersonCard from "@/components/PersonCard";
import { useFriends } from "@/context/FriendsContext";


export default function FriendsPage() {
const { invitationIds, friendIds, suggestionIds, getUser } = useFriends();
const invitations = useMemo(() => invitationIds.map(getUser).filter((user) => user !== undefined), [invitationIds, getUser]);
  const friends = useMemo(() => friendIds.map(getUser).filter((user) => user !== undefined), [friendIds, getUser]);
  const suggestions = suggestionIds.map(getUser).filter((user) => user !== undefined && !friendIds.includes(user.id));
  return (
    <main className="min-h-screen p-4 sm:p-6">
      <div className="mb-5 flex items-center justify-between"><div><h1 className="text-2xl font-bold">Ami(e)s</h1><p className="mt-1 text-sm text-gray-500">Gérez vos amis et vos invitations</p></div><Link href="/profile/me" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold shadow-sm">Mon profil</Link></div>
      <section id="invitations" className="mb-7">
        <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">Invitations ({invitations.length})</h2><button className="text-sm font-semibold text-[#0866ff]">Voir tout</button></div>
        {invitations.length ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">{invitations.map((user) => <PersonCard key={user.id} user={user} mode="invitation" />)}</div> : <div className="rounded-lg bg-white p-6 text-center text-sm text-gray-500">Aucune invitation pour le moment.</div>}
      </section>
      <div className="my-6 border-t border-gray-300" />
      <section id="suggestions" className="mb-8">
        <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">Vous connaissez peut-être</h2><button className="text-sm font-semibold text-[#0866ff]">Voir tout</button></div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">{suggestions.map((user) => <PersonCard key={user.id} user={user} mode="suggestion" />)}</div>
      </section>
      <div className="my-6 border-t border-gray-300" />
      <section id="all-friends">
        <div className="mb-3 flex items-center justify-between"><div><h2 className="text-lg font-bold">Tous mes ami(e)s</h2><p className="text-sm text-gray-500">{friends.length} ami(e)s dans cette démo</p></div><button className="flex items-center gap-2 rounded-lg bg-[#e4e6eb] px-3 py-2 text-sm font-semibold"><Users size={16} /> Trier <ChevronDown size={15} /></button></div>
        {friends.length ? <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">{friends.map((user) => <PersonCard key={user.id} user={user} mode="friend" />)}</div> : <div className="rounded-lg bg-white p-8 text-center text-sm text-gray-500">Ajoutez des amis pour les voir ici.</div>}
      </section>
    </main>
  );
}
