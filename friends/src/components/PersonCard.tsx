"use client";

import Link from "next/link";
import type { User } from "@/data/users";
import { useFriends } from "@/context/FriendsContext";

export default function PersonCard({ user, mode }: { user: User; mode: "invitation" | "suggestion" | "friend" }) {
  const { acceptInvitation, deleteInvitation, addFriend, removeFriend } = useFriends();
  return (
    <article className="facebook-shadow overflow-hidden rounded-lg border border-gray-200 bg-white">
      <Link href={`/profile/${user.id}`}>
        <img src={user.avatar} alt={user.name} className="h-[155px] w-full object-cover" />
      </Link>
      <div className="p-2.5">
        <Link href={`/profile/${user.id}`} className="block truncate text-sm font-semibold hover:underline">{user.name}</Link>
        <p className="mb-2 mt-1 min-h-[17px] text-[11px] text-gray-500">{user.mutualFriends > 0 ? `${user.mutualFriends} ami(e)s en commun` : " "}</p>
        {mode === "invitation" ? (
          <div className="space-y-1.5">
            <button onClick={() => acceptInvitation(user.id)} className="w-full rounded-md bg-[#0866ff] py-1.5 text-xs font-semibold text-white hover:bg-blue-700">Confirmer</button>
            <button onClick={() => deleteInvitation(user.id)} className="w-full rounded-md bg-[#e4e6eb] py-1.5 text-xs font-semibold hover:bg-gray-300">Supprimer</button>
          </div>
        ) : mode === "suggestion" ? (
          <div className="space-y-1.5">
            <button onClick={() => addFriend(user.id)} className="w-full rounded-md bg-[#e7f3ff] py-1.5 text-xs font-semibold text-[#0866ff] hover:bg-blue-100">Ajouter ami(e)</button>
            <button className="w-full rounded-md bg-[#e4e6eb] py-1.5 text-xs font-semibold hover:bg-gray-300">Supprimer</button>
          </div>
        ) : (
          <button onClick={() => removeFriend(user.id)} className="w-full rounded-md bg-[#e4e6eb] py-1.5 text-xs font-semibold hover:bg-gray-300">Retirer des ami(e)s</button>
        )}
      </div>
    </article>
  );
}
