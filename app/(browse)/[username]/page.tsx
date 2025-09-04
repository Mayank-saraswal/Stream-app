import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";

interface UserPageProps {
  params: Promise<{ username: string }>
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;   //await karo
  const user = await getUserByUsername(username);

  if (!user) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-y-4">
      <p>Username: {user.username}</p>
      <p>User ID: {user.id}</p>
    </div>
  );
};

export default UserPage;
