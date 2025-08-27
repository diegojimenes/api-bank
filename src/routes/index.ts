import { z } from 'zod'
import { FastifyTypeInstance } from '../types'

export const appRouter = async (app: FastifyTypeInstance) => {
    app.post('/', {
        schema: {
            description: "teste",
            tags: ["teste"],
            params: z.object({ id: z.string() }),
        }
    }, async function handler(request, reply) {
        const { id } = request.params
        return reply.status(201).send({ hello: 'world' })
    })

    return app
}