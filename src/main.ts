import Fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'

import { appRouter } from './routes'
import { AccountRepository } from './repositories/accountRepository'

export const accountRepository = new AccountRepository()

const fastify = Fastify({}).withTypeProvider<ZodTypeProvider>()

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

fastify.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'API BANKING',
            version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform
})

fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});

fastify.register(appRouter)

fastify.listen({ port: 3000 })
    .then(() => {
        console.log(`
API running on http://localhost:3000
Docs running on http://localhost:3000/docs`)
    })
    .catch((err) => {
        fastify.log.error(err)
        process.exit(1)
    })