import { prisma } from "@/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload

    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      try {
        await prisma.user.create({
          data: {
            id: id,
            username: evt.data.username!,
            email: evt.data.email_addresses[0].email_address,
            displayName:
              evt.data.first_name || evt.data.last_name
                ? `${evt.data.first_name} ${evt.data.last_name?.toUpperCase()}`
                : null,
          },
        });

        return new Response("User created successfully!", { status: 200 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to created user", { status: 500 });
      }
    }

    if (eventType === "user.deleted") {
      try {
        await prisma.user.delete({
          where: { id },
        });

        return new Response("User deleted successfully!", { status: 200 });
      } catch (error) {
        console.log(error);
        return new Response("Failed to delete user", { status: 500 });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
