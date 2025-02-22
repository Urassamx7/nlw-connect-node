import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { z } from "zod";
import { SubscribeToEvent } from "../functions/subscribe-to-event";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
    app.post('/subscriptions', {
        schema: {
            summary: "Subscribe somebody to event",
            tags: ["Subscriptions"],
            body: z.object({
                name: z.string(),
                email: z.string().email()
            }),
            response:
            {
                201: z.object({
                    subscriberId: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const { email, name } = request.body
        const { subscriberId } = await SubscribeToEvent({ email, name })
        return reply.status(201).send({ subscriberId })
    })
}