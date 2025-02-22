import { redis } from "../redis/client"

interface GetSubscriberRankingPositionProps {
    subscriberId: string
}

export async function getSubscriberRankingPosition({ subscriberId }: GetSubscriberRankingPositionProps) {
    const rank = await redis.zrevrank('referral:ranking', subscriberId)
    if (rank === null) {
        return { position: null }
    }
    return { position: rank + 1 }
}