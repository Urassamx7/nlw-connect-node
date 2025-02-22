import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

import { z } from "zod";
import { env } from "../utils/env";
import { accessInviteLink } from "../functions/acess-invite-link";
import { redis } from "../redis/client";

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
    app.get('/invites/:subscriberId', {
        schema: {
            summary: "Access invite link and redirects user",
            tags: ["referral"],
            params: z.object({
                subscriberId: z.string()
            }),
            response:
            {
                200: z.object({
                    subscriberId: z.string()
                })
            }
        }
    }, async (request, reply) => {
        const { subscriberId } = request.params
        await accessInviteLink({ subscriberId })
        const redirectUrl = new URL(env.WEB_URL)
        redirectUrl.searchParams.set('referrer', subscriberId)
        return reply.redirect(redirectUrl.toString(), 302)
    })
}