"use client"
import { onFollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner"
import { onUnfollow } from "@/actions/follow"

interface ActionsProps {
    isFollowing: boolean;
    userId : string
}
    
 export const Actions = ({isFollowing, userId}:ActionsProps)=> {

    const  [ isPending , startTransition] = useTransition();
    const handleFollow = ()=> {
        startTransition(()=>{
            onFollow(userId)
            .then((data)=> toast.success(`You are now following ${data.following.username}`))
            .catch(()=>  toast.error("Something went wrong"))
        
        });
           
        
    }



    const handleUnFollow = ()=> {
        startTransition(()=>{
            onUnfollow(userId)
            .then((data)=> toast.success(`You have unfollowed User ${data.following.username}`))
            .catch(()=>  toast.error("Something went wrong"))
        
        });

    }


    const onClick = isFollowing ? handleUnFollow : handleFollow
    return (
        <div>
            <Button  disabled= {isPending}  onClick={onClick} variant="primary">
                {isFollowing ?"Unfollow":"Follow"}
            </Button>
        </div>
    )
}