import { z } from 'zod'
import { FastifyTypeInstance } from '../types'
import { restDB } from '../useCases/restDB'
import { getBalance } from '../useCases/getBalance'
import { event } from '../useCases/event'

export const appRouter = async (app: FastifyTypeInstance) => {
    app.post('/rest', {
        schema: {
            description: "route to restart the base",
            tags: ["banking"],
        }
    }, async function handler(_, reply) {
        restDB()
        return reply.status(200).send("OK")
    })

    app.post('/balance', {
        schema: {
            tags: ["banking"],
            description: "route to check user balance",
            querystring: z.object({
                id: z.string()
            })
        }
    }, async function handler(request, reply) {
        try {
            const { id } = request.query
            const balance = getBalance({ id })
            return reply.status(200).send(balance)
        } catch (err) {
            if (err === "account does not exist") {
                reply.status(404).send(0)
            }
        }
    })

    app.post('/event', {
        schema: {
            tags: ["banking"],
            description: "route to handle deposit, withdrawal and transfer",
            body: z.object({
                type: z.enum(["deposit", "withdraw", "transfer"]),
                origin: z.string().optional(),
                destination: z.string().optional(),
                amount: z.number()
            })
        }
    }, async function handler(request, reply) {
        try {
            const { type, origin, destination, amount } = request.body

            const balance = event({ type, origin, destination, amount })

            return reply.status(201).send(balance)
        } catch (err) {
            if (err === 0) {
                reply.status(404).send(err)
                return
            }
            reply.status(500).send(err)
        }
    })

    return app
}