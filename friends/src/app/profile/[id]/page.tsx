import { notFound } from "next/navigation";
import ProfileView from "@/components/ProfileView";
import { currentUser, findUser } from "@/data/users";

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = id === "me" ? currentUser : findUser(id);
  if (!user) notFound();
  return <ProfileView user={user} />;
}
