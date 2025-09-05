import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { Actions } from "./_components/actions";

interface UserPageProps {
  params: Promise<{ username: string }>;
}

const UserPage = async ({ params }: UserPageProps) => {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    return notFound(); //  function call
  }

  const isFollowing = await isFollowingUser(user.id);

  //  Pure server-rendered HTML, no client hook
  return (
    <div className="flex flex-col gap-y-4">
      <p>Username:  {user.username}
      </p>
      <p>User ID: {user.id}  </p>
      <p>Is Following: {`${isFollowing}`}</p>
      <Actions  userId={user.id} isFollowing= {isFollowing}   />
    </div>
  );
};

export default UserPage;
