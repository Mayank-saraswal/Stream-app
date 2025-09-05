"use server";

import { blockUser } from "@/lib/block-service"
import { revalidatePath } from "next/cache";
import { unblockUser } from "@/lib/block-service";
export const onBlock = async (id: string) => {

    try {

        const blockedUser = await blockUser(id);
        revalidatePath("/");

        if (blockedUser) {
            revalidatePath(`/${blockedUser.blocked.username}`)
        }

        return blockedUser;
    } catch (error) {
        console.log(error)
    }




}

export const onUnblock = async (id: string) => {
    const unblockedUser = await unblockUser(id);
    revalidatePath("/");

    if (unblockedUser) {
        revalidatePath(`/${unblockedUser.blocked.username}`)
    }

    return unblockedUser;
}