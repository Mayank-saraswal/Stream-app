"use client"
import { onFollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"
import { onUnfollow } from "@/actions/follow"
import { onBlock , onUnblock } from "@/actions/block"

interface ActionsProps {
    isFollowing: boolean;
    userId: string
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {

    const [isPending, startTransition] = useTransition();
    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => {
                    if (data && typeof data !== 'boolean') {
                        toast.success(`You are now following ${data.following.username}`)
                    }
                })
                .catch(() => toast.error("Something went wrong"))

        });


    }



    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => {
                    if (data && typeof data !== 'boolean') {
                        toast.success(`You have unfollowed User ${data.following.username}`)
                    }
                })
                .catch(() => toast.error("Something went wrong"))

        });

    }
    const onClick = isFollowing ? handleUnFollow : handleFollow


    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
             .then((data) => {
                    if (data && typeof data !== 'boolean') {
                        toast.success(`You have Blocked User ${data.blocked.username}`)
                    }
                })
           
               
                .catch(() => toast.error("Something went wrong"))

        });

    }



    const handleUnBlock = () => {
        startTransition(() => {
            onUnblock(userId)
             .then((data) => {
                    if (data && typeof data !== 'boolean') {
                        toast.success(`You have Unblocked User ${data.blocked.username}`)
                    }
                })
           
               
                .catch(() => toast.error("Something went wrong"))

        });

    }

    

    
    return (
        <>
            <Button disabled={isPending} onClick={onClick} variant="primary">
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>

            <Button disabled={isPending} onClick={handleUnBlock} variant="primary">
                UnBlock
            </Button>

            </> 
    )
}