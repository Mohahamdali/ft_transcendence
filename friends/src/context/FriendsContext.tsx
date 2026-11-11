"use client";

// useEffect هي React Hook كتسمح لينا ننفذو عملية من بعد ما component يظهر فالشاشة.
// مثلاً: ملي تفتح صفحة Friends، نجيبو البيانات من Django.
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import { type User, users } from "@/data/users";

type FriendsContextValue = {
  friendIds: string[];
  invitationIds: string[];
  suggestionIds: string[];
  acceptInvitation: (id: string) => void;
  deleteInvitation: (id: string) => void;
  addFriend: (id: string) => Promise<void>;
  removeFriend: (id: string) => void;
  getUser: (id: string) => User | undefined;
};

// خاصنا نشوفو واش المستخدم الحالي هو sender أو receiver:
// - إذا كان sender هو المستخدم الحالي، الصديق هو receiver.
// - إذا كان receiver هو المستخدم الحالي، الصديق هو sender.
type Friendship = {
  id: number;
  sender: number;
  sender_username: string;
  receiver: number;
  receiver_username: string;
  status: string;
};

type ApiUser = {
  id: number;
  username: string;
};

type FriendRequest = {
  id: number;
  sender: number;
  sender_username: string;
  receiver: number;
  receiver_username: string;
  status: string;
};

const FriendsContext = createContext<FriendsContextValue | null>(null);

export function FriendsProvider({ children }: { children: React.ReactNode }) {
const [friendIds, setFriendIds] = useState<string[]>([]);
const [invitationIds, setInvitationIds] = useState<string[]>([]);
const [sentRequestIds, setSentRequestIds] = useState<string[]>([]);
const [apiUsers, setApiUsers] = useState<ApiUser[]>([]);

// نحوّلو ApiUser إلى User باش نحافظو على نفس التصميم ديال PersonCard.
const djangoUsers: User[] = apiUsers.map((apiUser) => ({
  id: String(apiUser.id),
  name: apiUser.username,
  avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(apiUser.username)}`,
  cover: "",
  city: "",
  mutualFriends: 0,
  bio: "",
  friendsCount: 0,
  posts: [],
  photos: [],
}));

useEffect(() => {
  async function loadUsers() {
    try {
      const response = await fetch("/api/friends/users");

      if (!response.ok) {
        throw new Error("Failed to load users");
      }
      const data: ApiUser[] = await response.json();

      console.log("Users received from API:", data);

      setApiUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  }

  loadUsers();
}, []);

  // useEffect اللي غادي يجيب الأصدقاء من Django.
  useEffect(() => {
  async function loadFriends() {
    try {
      const response = await fetch("/api/friends");

      if (!response.ok) {
        throw new Error("Failed to load friends");
      }

      const data: Friendship[] = await response.json();

      const ids = data.map((friend) => {
        return friend.sender === 1
          ? String(friend.receiver)
          : String(friend.sender);
      });

      setFriendIds(ids);
    } catch (error) {
      console.error("Error loading friends:", error);
    }
  }

  loadFriends();
}, []);


// دابا غادي نجيبو Friend Requests (Invitations) 

useEffect(() => {
  async function loadInvitations() {
    try {
      const response = await fetch("/api/friends/requests");

      if (!response.ok) {
        throw new Error("Failed to load invitations");
      }

      const data: FriendRequest[] = await response.json();

      const ids = data.map((request) => String(request.sender));

      setInvitationIds(ids);
    } catch (error) {
      console.error("Error loading invitations:", error);
    }
  }

  loadInvitations();
}, []);

// Load friend requests sent by current user.
// - كيتاصل بـ Django باش يجيب الطلبات اللي صيفطنا.
// - request.receiver هو ID ديال الشخص اللي صيفطنا ليه الطلب.
// - كيخزن هاد IDs فـ sentRequestIds.
useEffect(() => {
  async function loadSentRequests() {
    try {
      const response = await fetch("/api/friends/sent-requests");

      if (!response.ok) {
        throw new Error("Failed to load sent requests");
      }

      const data: FriendRequest[] = await response.json();

      const ids = data.map((request) => String(request.receiver));

      setSentRequestIds(ids);
    } catch (error) {
      console.error("Error loading sent requests:", error);
    }
  }

  loadSentRequests();
}, []);


const suggestionIds = djangoUsers
  .filter((user) =>
    !friendIds.includes(user.id) &&
    !invitationIds.includes(user.id) &&
    !sentRequestIds.includes(user.id)
    // يعني إلا كنا صيفطنا طلب صداقة لشي واحد ومازال ما تقبلش، ما يبانش فـ Suggestions.
  )
  .map((user) => user.id);


  const value = useMemo<FriendsContextValue>(() => ({
    friendIds,
    invitationIds,
    suggestionIds,
    acceptInvitation: (id) => {
      setInvitationIds((current) => current.filter((item) => item !== id));
      setFriendIds((current) => current.includes(id) ? current : [...current, id]);
    },
    deleteInvitation: (id) => setInvitationIds((current) => current.filter((item) => item !== id)),
    
    addFriend: async (id) => {
      try {
        const response = await fetch("/api/friends/send-request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiver_id: Number(id),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send friend request");
        }

        setSentRequestIds((current) =>
          current.includes(id) ? current : [...current, id]
        );

        console.log("Friend request sent successfully!");
      } catch (error) {
        console.error("Error sending friend request:", error);
      }
    },
    removeFriend: (id) => setFriendIds((current) => current.filter((item) => item !== id)),
    getUser: (id) =>
    djangoUsers.find((user) => user.id === id) ??
    users.find((user) => user.id === id),
 }), [friendIds, invitationIds, sentRequestIds, djangoUsers]);

  console.log("Django users:", apiUsers);
  return <FriendsContext.Provider value={value}>{children}</FriendsContext.Provider>;
}

export function useFriends() {
  const context = useContext(FriendsContext);
  if (!context) throw new Error("useFriends must be used inside FriendsProvider");
  return context;
}
