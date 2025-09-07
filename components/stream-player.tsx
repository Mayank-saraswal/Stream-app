"use client"

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";

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

    // Show loading state while token is being created
 

    // Check if token creation failed or any required data is missing
    if (!token || !name || !identity) {
        return (
            <div>
                Cannot Watch The Stream
            </div>
        );
    }

    return (
        <div>
            Allowed to watch the stream
        </div>
    );
};

export default StreamPlayer;