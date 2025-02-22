import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import z from "zod";

export const SubscribeToEventRoute: FastifyPluginAsyncZod = async (app) => {
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
                    name: z.string(),
                    email: z.string().email()
                })
            }
        }
    }, async (request, reply) => {
        const { email, name } = request.body

        return reply.status(201).send({ email, name })
    })
}