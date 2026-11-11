"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Camera, Check, LockKeyhole, MapPin, MoreHorizontal, Pencil, Plus, ShieldCheck, Users } from "lucide-react";
import { currentUser, users, type User } from "@/data/users";
import { useFriends } from "@/context/FriendsContext";

export default function ProfileView({ user }: { user: User }) {
  const { friendIds, addFriend, removeFriend } = useFriends();
  const isMe = user.id === "me";
  const isFriend = friendIds.includes(user.id);
  const canSeePosts = isMe || isFriend;
  const [tab, setTab] = useState("Publications");
  const [editing, setEditing] = useState(false);
  const tabs = ["Tout", "À propos", "Ami(e)s", "Photos", "Plus"];

  const visiblePosts = useMemo(() => canSeePosts ? user.posts : [], [canSeePosts, user.posts]);

  return (
    <main className="min-h-screen bg-[#f0f2f5] pb-12">
      <div className="mx-auto max-w-[1100px] bg-white">
        <div className="relative h-[230px] overflow-hidden rounded-b-lg bg-gray-300 sm:h-[320px]">
          <img src={user.cover} alt="Cover" className="h-full w-full object-cover" />
          {isMe && <button className="absolute bottom-4 right-5 flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow"><Camera size={16} /> Modifier la couverture</button>}
        </div>
        <div className="relative border-b px-5 pb-4 sm:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="-mt-12 h-[150px] w-[150px] shrink-0 overflow-hidden rounded-full border-[5px] border-white bg-gray-200 sm:-mt-[70px] sm:h-[170px] sm:w-[170px]">
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 pb-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="mt-1 text-sm font-semibold text-gray-600">{user.friendsCount + (isMe ? 0 : 0)} ami(e)s</p>
              <p className="mt-1 text-xs text-gray-500">{user.mutualFriends > 0 && !isMe ? `${user.mutualFriends} ami(e)s en commun · ` : ""}<MapPin size={12} className="mr-1 inline" />{user.city}</p>
            </div>
            <div className="flex flex-wrap gap-2 pb-2">
              {isMe ? (
                <button onClick={() => setEditing(true)} className="flex items-center gap-2 rounded-md bg-[#e4e6eb] px-4 py-2 text-sm font-semibold hover:bg-gray-300"><Pencil size={15} /> Modifier le profil</button>
              ) : isFriend ? (
                <>
                  <button className="flex items-center gap-2 rounded-md bg-[#e4e6eb] px-4 py-2 text-sm font-semibold"><Check size={16} /> Ami(e)</button>
                  <button className="rounded-md bg-[#e4e6eb] px-4 py-2 text-sm font-semibold">Message</button>
                  <button onClick={() => removeFriend(user.id)} className="rounded-md bg-[#e4e6eb] px-3 py-2 text-sm font-semibold">Retirer</button>
                </>
              ) : (
                <>
                  <button onClick={() => addFriend(user.id)} className="flex items-center gap-2 rounded-md bg-[#0866ff] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"><Plus size={16} /> Ajouter ami(e)</button>
                  <button className="rounded-md bg-[#e4e6eb] px-4 py-2 text-sm font-semibold">Message</button>
                  <button className="rounded-md bg-[#e4e6eb] px-3 py-2"><MoreHorizontal size={18} /></button>
                </>
              )}
            </div>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-5 sm:px-8">
          {tabs.map((item) => <button key={item} onClick={() => setTab(item === "Tout" ? "Publications" : item)} className={`whitespace-nowrap border-b-[3px] px-3 py-4 text-sm font-semibold ${tab === item || (item === "Tout" && tab === "Publications") ? "border-[#0866ff] text-[#0866ff]" : "border-transparent text-gray-600 hover:bg-gray-50"}`}>{item}</button>)}
          <button className="ml-auto my-2 rounded-md bg-[#e4e6eb] px-3"><MoreHorizontal size={18} /></button>
        </nav>
      </div>

      <div className="mx-auto mt-4 grid max-w-[1100px] grid-cols-1 gap-4 px-3 md:grid-cols-[minmax(270px,0.8fr)_minmax(0,1.2fr)] sm:px-0">
        <section className="space-y-4">
          <div className="facebook-shadow rounded-lg bg-white p-4">
            <h2 className="mb-3 text-lg font-bold">Intro</h2>
            <p className="text-center text-sm">{user.bio}</p>
            {isMe && <button onClick={() => setEditing(true)} className="mt-3 w-full rounded-md bg-[#e4e6eb] py-2 text-sm font-semibold">Modifier la bio</button>}
            <div className="mt-4 space-y-3 border-t pt-3 text-sm text-gray-700"><p><MapPin size={17} className="mr-2 inline" />Habite à {user.city}</p><p><Users size={17} className="mr-2 inline" />{user.friendsCount} ami(e)s</p></div>
          </div>
          <div className="facebook-shadow rounded-lg bg-white p-4">
            <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">Photos</h2><button onClick={() => setTab("Photos")} className="text-sm text-[#0866ff]">Voir tout</button></div>
            {canSeePosts ? <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-lg">{user.photos.slice(0, 6).map((src, i) => <img key={i} src={src} alt="Photo" className="aspect-square w-full object-cover" />)}</div> : <p className="text-sm text-gray-500">Les photos sont réservées aux ami(e)s.</p>}
          </div>
        </section>

        <section className="space-y-4">
          {!canSeePosts ? (
            <div className="facebook-shadow rounded-lg bg-white p-7 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f3ff] text-[#0866ff]"><LockKeyhole size={26} /></div>
              <h2 className="font-bold">{user.name} a verrouillé son profil</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">Seul(e)s ses ami(e)s peuvent voir ce qu’il/elle partage sur son profil.</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#e7f3ff] px-3 py-2 text-xs font-semibold text-[#0866ff]"><ShieldCheck size={15} /> Informations publiques uniquement</div>
            </div>
          ) : (
            <>
              <div className="facebook-shadow rounded-lg bg-white p-4">
                <h2 className="text-lg font-bold">{tab === "Photos" ? "Photos" : tab === "Ami(e)s" ? "Ami(e)s" : tab === "À propos" ? "À propos" : "Publications"}</h2>
                {tab === "À propos" ? <p className="mt-4 text-sm">Habite à {user.city}. {user.bio}</p> : tab === "Ami(e)s" ? <div className="mt-3 grid grid-cols-2 gap-3">{[currentUser, ...usersForProfile(user.id)].slice(0, 4).map((person) => <Link href={`/profile/${person.id}`} key={person.id} className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-50"><img src={person.avatar} className="h-12 w-12 rounded-lg object-cover" alt="" /><span className="text-sm font-semibold">{person.name}</span></Link>)}</div> : tab === "Photos" ? <div className="mt-3 grid grid-cols-3 gap-1">{user.photos.map((src, i) => <img key={i} src={src} alt="Photo" className="aspect-square w-full object-cover" />)}</div> : <div className="mt-4 space-y-4">{visiblePosts.map((post) => <article key={post.id} className="border-t pt-4"><div className="flex items-center gap-2"><img src={user.avatar} className="h-10 w-10 rounded-full object-cover" alt="" /><div><p className="text-sm font-semibold">{user.name}</p><p className="text-xs text-gray-500">{post.date}</p></div></div><p className="my-3 text-sm">{post.text}</p>{post.image && <img src={post.image} alt="Post" className="max-h-[420px] w-full rounded-lg object-cover" />}<p className="mt-3 text-xs text-gray-500">👍 {post.likes} J’aime</p></article>)}</div>}
                {tab !== "À propos" && tab !== "Ami(e)s" && tab !== "Photos" && visiblePosts.length === 0 && <p className="py-8 text-center text-sm text-gray-500">Aucune publication disponible</p>}
              </div>
              {isMe && <button className="facebook-shadow flex w-full items-center justify-center gap-2 rounded-lg bg-white p-3 text-sm font-semibold"><Plus size={17} /> Créer une publication</button>}
            </>
          )}
        </section>
      </div>

      {editing && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"><div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl"><div className="flex items-center justify-between"><h2 className="text-lg font-bold">Modifier le profil</h2><button onClick={() => setEditing(false)} className="rounded-full bg-gray-100 px-3 py-1">✕</button></div><p className="mt-4 text-sm text-gray-600">La modification est simulée dans cette version frontend. Le formulaire sera connecté au backend Django plus tard.</p><label className="mt-4 block text-sm font-semibold">Nom</label><input defaultValue={currentUser.name} className="mt-1 w-full rounded-lg border p-2 text-sm outline-blue-500" /><label className="mt-3 block text-sm font-semibold">Bio</label><textarea defaultValue={currentUser.bio} className="mt-1 w-full rounded-lg border p-2 text-sm outline-blue-500" /><button onClick={() => setEditing(false)} className="mt-4 w-full rounded-lg bg-[#0866ff] py-2 text-sm font-semibold text-white">Enregistrer</button></div></div>}
    </main>
  );
}

function usersForProfile(exceptId: string) {
  return users.filter((person) => person.id !== exceptId).slice(0, 3);
}
