import Fastify from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'

import { appRouter } from './routes'
import { AccountRepository } from './repositories/accountRepository'

export const accountRepository = new AccountRepository()

const fastify = Fastify({}).withTypeProvider<ZodTypeProvider>()

fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (_req, body: any, done) {
    if (!body || body.trim() === '') {
        return done(null, {})
    }
    try {
        const json = JSON.parse(body)
        done(null, json)
    } catch (err) {
        err.statusCode = 400
        done(err, undefined)
    }
})

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

fastify.listen({
    host: "0.0.0.0",
    port: 3000
})
    .then(() => {
        console.log(`
API running on http://localhost:3000
Docs running on http://localhost:3000/docs`)
    })
    .catch((err) => {
        fastify.log.error(err)
        process.exit(1)
    })