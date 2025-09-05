import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

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
  const isBlocked = await isBlockedByUser(user.id);
  // if (!user) {
  //   return notFound(); 
  // }

 
  return (
    <div className="flex flex-col gap-y-4">
      <p>Username:  {user.username}
      </p>
      <p>User ID: {user.id}  </p>
      <p>Is Following: {`${isFollowing}`}</p>
      <p>Is Blocked by this User: {`${isBlocked}`}</p>
      <Actions  userId={user.id} isFollowing= {isFollowing}   />
    </div>
  );
};

export default UserPage;
