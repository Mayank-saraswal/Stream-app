import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// Clerk webhook ka POST handler
export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET in .env");
  }

  // Clerk headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  // Get raw body as text first
  const payload = await req.text();
  const body = payload;

  // Verify Clerk webhook
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;
  
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
    console.log("✅ Verified Event:", evt.type);
    console.log("📦 Event Data:", JSON.stringify(evt.data, null, 2));
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const eventType = evt.type;

  try {
    // 🟢 Clerk User Created
    if (eventType === "user.created") {
      await db.user.create({
        data: {
          externalUserId: evt.data.id,
          username: evt.data.username || `user_${evt.data.id.slice(0, 8)}`,
          imageUrl: evt.data.image_url || "",
          stream:{
            create:{
              name: `${evt.data.username}'s stream`
            },
            
          }
        }
      });
      console.log("✅ User created successfully:", evt.data.id);
    }

    // 🟢 Clerk User Updated
    if (eventType === "user.updated") {
      const currentUser = await db.user.findUnique({
        where: {
          externalUserId: evt.data.id
        }
      });

      if (!currentUser) {
        console.error("User not found for update:", evt.data.id);
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      await db.user.update({
        where: {
          externalUserId: evt.data.id
        },
        data: {
          username: evt.data.username || currentUser.username,
          imageUrl: evt.data.image_url || currentUser.imageUrl
        }
      });
      console.log("✅ User updated successfully:", evt.data.id);
    }

    // 🟡 Clerk User Deleted (optional)
    if (eventType === "user.deleted") {
      await db.user.delete({
        where: {
          externalUserId: evt.data.id
        }
      });
      console.log("✅ User deleted successfully:", evt.data.id);
    }

    return NextResponse.json({ message: "Webhook processed successfully" }, { status: 200 });

  } catch (dbError) {
    console.error("Database operation failed:", dbError);
    return NextResponse.json(
      { error: "Database operation failed" }, 
      { status: 500 }
    );
  }
}