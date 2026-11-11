export type Post = {
  id: string;
  text: string;
  date: string;
  image?: string;
  likes: number;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  cover: string;
  city: string;
  mutualFriends: number;
  bio: string;
  friendsCount: number;
  isOnline?: boolean;
  posts: Post[];
  photos: string[];
};

const photo = (id: string, width = 700) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const currentUser: User = {
  id: "me",
  name: "Wiam Khamlich",
  avatar: photo("photo-1534528741775-53994a69daeb", 240),
  cover: photo("photo-1500530855697-b586d89ba3ee", 1500),
  city: "Casablanca",
  mutualFriends: 0,
  bio: "Bienvenue sur mon profil !",
  friendsCount: 312,
  isOnline: true,
  posts: [
    { id: "p1", text: "Une belle journée avec de bons souvenirs ☀️", date: "Il y a 2 heures", image: photo("photo-1470770841072-f978cf4d019e"), likes: 24 },
    { id: "p2", text: "Hello tout le monde 👋", date: "Hier", likes: 12 }
  ],
  photos: [photo("photo-1470770841072-f978cf4d019e"), photo("photo-1500530855697-b586d89ba3ee"), photo("photo-1518837695005-2083093ee35b")]
};

export const users: User[] = [
  {
    id: "ahmed", name: "Ahmed Ennadifi",
    avatar: photo("photo-1506794778202-cad84cf45f1d", 240),
    cover: photo("photo-1500530850859-6a3e5e3a1f55", 1500),
    city: "Casablanca", mutualFriends: 12, bio: "Étudiant • Toujours positif ✨", friendsCount: 248, isOnline: true,
    posts: [{ id: "a1", text: "Profiter des petits moments de la vie.", date: "Il y a 1 jour", image: photo("photo-1500530855697-b586d89ba3ee"), likes: 38 }],
    photos: [photo("photo-1500530855697-b586d89ba3ee"), photo("photo-1518837695005-2083093ee35b")]
  },
  {
    id: "hiba", name: "Hiba Etejnnn",
    avatar: photo("photo-1531123897727-8f129e1688ce", 240),
    cover: photo("photo-1470770841072-f978cf4d019e", 1500),
    city: "Rabat", mutualFriends: 4, bio: "Photography & good vibes 🌸", friendsCount: 186,
    posts: [{ id: "h1", text: "Quelques souvenirs 💗", date: "Il y a 3 jours", likes: 19 }],
    photos: [photo("photo-1490750967868-88aa4486c946"), photo("photo-1518837695005-2083093ee35b")]
  },
  {
    id: "karim", name: "Karim Benyaich",
    avatar: photo("photo-1500648767791-00dcc994a43e", 240),
    cover: photo("photo-1519608487953-e999c86e7455", 1500),
    city: "Marrakech", mutualFriends: 2, bio: "Profile privé", friendsCount: 521,
    posts: [{ id: "k1", text: "Une journée inoubliable.", date: "Il y a 5 jours", image: photo("photo-1519608487953-e999c86e7455"), likes: 51 }],
    photos: [photo("photo-1519608487953-e999c86e7455"), photo("photo-1500530855697-b586d89ba3ee")]
  },
  {
    id: "hamza", name: "Hamza Yekken",
    avatar: photo("photo-1507003211169-0a1dd7228f2d", 240),
    cover: photo("photo-1500530855697-b586d89ba3ee", 1500),
    city: "Fès", mutualFriends: 7, bio: "Music lover 🎧", friendsCount: 97,
    posts: [{ id: "m1", text: "Weekend mood.", date: "Il y a 1 semaine", likes: 8 }],
    photos: [photo("photo-1500530855697-b586d89ba3ee")]
  },
  {
    id: "bra", name: "Bra HeEm",
    avatar: photo("photo-1506794778202-cad84cf45f1d", 240),
    cover: photo("photo-1518837695005-2083093ee35b", 1500),
    city: "Tanger", mutualFriends: 1, bio: "Hello 👋", friendsCount: 143,
    posts: [{ id: "b1", text: "Good times!", date: "Il y a 2 semaines", likes: 11 }],
    photos: [photo("photo-1518837695005-2083093ee35b")]
  },
  {
    id: "zineb", name: "Filahi Zineb",
    avatar: photo("photo-1544005313-94ddf0286df2", 240),
    cover: photo("photo-1490750967868-88aa4486c946", 1500),
    city: "Casablanca", mutualFriends: 0, bio: "🌷", friendsCount: 305,
    posts: [{ id: "z1", text: "Spring days 🌷", date: "Il y a 4 jours", likes: 32 }],
    photos: [photo("photo-1490750967868-88aa4486c946")]
  }
];

export const initialFriendIds = ["ahmed", "hiba"];
export const initialInvitations = ["zineb"];
export const suggestionIds = ["karim", "hamza", "bra"];
export const findUser = (id: string) => id === "me" ? currentUser : users.find((user) => user.id === id);
