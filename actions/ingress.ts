"use server"
import {
    IngressAudioEncodingPreset,
    IngressVideoEncodingPreset,
    IngressClient,
    IngressInput,
    RoomServiceClient,
    CreateIngressOptions,
    IngressAudioOptions,
    IngressVideoOptions
} from "livekit-server-sdk"


import { TrackSource } from "livekit-server-sdk"

import { db } from "@/lib/db"
import { getSelf } from "@/lib/auth-service"

import { revalidatePath } from "next/cache"


const getRoomService = () => new RoomServiceClient(
    process.env.LIVEKIT_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)

const getIngressClient = () => new IngressClient(
    process.env.LIVEKIT_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)

export const resetIngress = async (hostIdentity: string) => {
    try {
        const ingressClient = getIngressClient()
        const roomService = getRoomService()

        const ingresses = await ingressClient.listIngress({
            roomName: hostIdentity,

        })
        const rooms = await roomService.listRooms([hostIdentity])

        for (const room of rooms) {
            await roomService.deleteRoom(room.name)
        }
        for (const ingress of ingresses) {
            if (ingress.ingressId) {
                await ingressClient.deleteIngress(ingress.ingressId)
            }
        }
    } catch (error) {
        console.error("Error resetting ingress:", error)
        throw new Error("Failed to reset ingress")
    }
}



// Helper function to add timeout to promises
const withTimeout = <T>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) => 
            setTimeout(() => reject(new Error(`Operation timed out after ${timeoutMs}ms`)), timeoutMs)
        )
    ])
}

export const createIngress = async (ingressType: IngressInput) => {
    const self = await getSelf()

    // Skip reset for now to avoid timeout issues
    // await resetIngress(self.id);


    const options: CreateIngressOptions = {
        name: self.username,
        roomName: self.id,
        participantName: self.username,
        participantIdentity: self.id,



    };
    if (ingressType === IngressInput.WHIP_INPUT) {

        options.enableTranscoding = false;
    } else {
        options.video = new IngressVideoOptions({
            source: TrackSource.CAMERA,
            encodingOptions: {
                case: 'preset',
                value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
            },
        });
        options.audio = new IngressAudioOptions({
            source: TrackSource.MICROPHONE,
            encodingOptions: {
                case: 'preset',
                value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
            },
        });
    }
    try {
        const ingressClient = getIngressClient()
        const ingress = await withTimeout(
            ingressClient.createIngress(ingressType, options),
            10000 // 10 second timeout
        );

        if (!ingress || !ingress.url || !ingress.streamKey) {
            throw new Error("Failed to create ingress")
        }
        await db.stream.update({
            where: {
                userId: self.id
            },
            data: {
                ingressId: ingress.ingressId,
                streamKey: ingress.streamKey,
                serverUrl: ingress.url

            }
        });


        revalidatePath(`/u/${self.username}/keys`);

        // Return only serializable data
        return {
            ingressId: ingress.ingressId,
            url: ingress.url,
            streamKey: ingress.streamKey,
            name: ingress.name
        };
    } catch (error) {
        console.error("Error creating ingress:", error)
        throw new Error("Failed to create ingress. Please check your LiveKit configuration and try again.")
    }

}
