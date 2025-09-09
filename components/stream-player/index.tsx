"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";
import {LiveKitRoom} from "@livekit/components-react";
import { Video } from "./video";
interface StreamPlayerProps {
    user: User & { stream: Stream | null; }
    stream: Stream;
    isFollowing: boolean;
}

export const StreamPlayer = ({
    user,
    stream,
    isFollowing
}: StreamPlayerProps) => {
    const { token, name, identity,  } = useViewerToken(user.id);
    // console.log("token", token);
    // console.log("name", name);
    // console.log("identity", identity);

    // Show loading state while token is being created
 

    // Check if token creation failed or any required data is missing
    if (!token || !name || !identity) {
        return (
            <div>
                Cannot Watch The Stream
            </div>
        );
    }

    return(
        <>
          <LiveKitRoom
          token={token}
          serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
          className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full "

          >

            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-auto hidden-scrollbar pb-10">
                <Video
                hostName={user.username}
                hostIdentity={user.id}
                />

            </div>
          </LiveKitRoom>
        </>
    );
};

export default StreamPlayer;