import { db } from "../drizzle/client"
import { subscriptions } from "../drizzle/schema/subscriptions"

interface SubscribeToEventProps {
    name: string
    email: string
}

export async function SubscribeToEvent({ name, email }: SubscribeToEventProps): Promise<{
    subscriberId: string;
}> {
    const result = await db.insert(subscriptions).values({ name, email }).returning()
    const subscriber = result[0]

    return ({ subscriberId: subscriber.id })
}