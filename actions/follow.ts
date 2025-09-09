"use server";

import { followUser } from "@/lib/follow-service";
import { revalidatePath } from "next/cache";
import { unfollowUser } from "@/lib/follow-service";

export const onFollow = async (id:string )=>{
    try {
        const followedUser = await followUser(id );
        revalidatePath("/");

        if(followedUser){
            revalidatePath(`/user/${followedUser?.following.username}`);
        }
        return followedUser;
    } catch (error) {
        throw new Error("Internal error ");
    }
}



export const onUnfollow = async (id:string)=>{
    try {
        const unfollowedUser = await unfollowUser(id);
        revalidatePath("/");

        if(unfollowedUser){
            revalidatePath(`/user/${unfollowedUser.following.username}`);
        }
        return unfollowedUser;
    } catch (error) {
        throw new Error("Internal error ");
    }
}