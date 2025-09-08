
import StreamPlayer from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";

import { currentUser } from "@clerk/nextjs/server";


interface CreatorProps {
  params: {
    username: string;
  };
}

const CreatorUser = async ({ params }: CreatorProps) => {
  const externalUser = await currentUser();
  const user = await getUserByUsername((await params).username);


  if (!user || !externalUser || user.externalUserId !== externalUser.id || !user.stream) {
    throw new Error("Unauthorized");
  }

  return (
    <div className="h-full">
      <StreamPlayer
        user={user}
        isFollowing={true}
        stream={user.stream}
      />
    </div>
  );
};

export default CreatorUser;
