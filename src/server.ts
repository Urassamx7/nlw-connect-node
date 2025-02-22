import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { subscribeToEventRoute } from './routes/subscribe-to-event-route'
import { env } from './utils/env'
import { accessInviteLinkRoute } from './routes/access-invite-link'
import { getSubscriberInviteLinkRoute } from './routes/get-subscriber-invite-clicks-route'
import { getSubscriberInviteCountsRoute } from './routes/get-subscriber-invite-counts-route'
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route'
import { getRankingRoute } from './routes/get-ranking-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

//Server Configuration
app.register(fastifyCors, {
    origin: '*',
})
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "NLW CONNECT API",
            version: "0.0.1"
        }
    },
    transform: jsonSchemaTransform
})
app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
})
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

//Routes
app.register(subscribeToEventRoute)
app.register(accessInviteLinkRoute)
app.register(getSubscriberInviteLinkRoute)
app.register(getSubscriberInviteCountsRoute)
app.register(getSubscriberRankingPositionRoute)
app.register(getRankingRoute)


app.listen({
    port: env.PORT
}).then((port) => console.log(`HTTP Server Running on port ${port}!`))