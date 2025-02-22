import { redis } from "../redis/client"

interface GetSubscriberInviteClickProps {
    subscriberId: string
}

export async function getSubscriberInviteClicks({ subscriberId }: GetSubscriberInviteClickProps) {
    const count = await redis.hget('referral:access-count', subscriberId)
    return { count: count ? Number.parseInt(count) : 0 }
}