import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { SubscribeToEventRoute } from './routes/subscribe-to-event-route'
import { env } from './utils/env'

const app = fastify().withTypeProvider<ZodTypeProvider>()

//Server Configuration
app.register(fastifyCors, {
    origin: true,
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
app.register(SubscribeToEventRoute)


app.listen({
    port: env.PORT
}).then((port) => console.log(`HTTP Server Running on port ${port}!`))