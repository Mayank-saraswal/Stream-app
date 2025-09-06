"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { Stream    } from "@prisma/client"
import { getSelf } from "@/lib/auth-service"

export const updatedStream = async (value:Partial<Stream>  )=>{

try {
    const self = await getSelf()
    const selfStream = await db.stream.findUnique({
        where:{
            userId:self.id
        }
    })
    if(!selfStream){
        throw new Error("Stream not found")
    }

    const validData ={
        isChatEnabled:value.isChatEnabled,
        isChatDelayed:value.isChatDelayed,
        isChatFollowersOnly:value.isChatFollowersOnly
    }
  
    

    const stream = await db.stream.update({
        where:{
            id: selfStream.id
        },
        data:{
            ...validData
        }
    })


   
     revalidatePath(`/u/${self.username}/chat`)
     revalidatePath(`/u/${self.username}`)
     revalidatePath(`/u/${self.username}`)
     
     return stream









} catch  {
    throw new Error("Internal  Server Error")
}





}
