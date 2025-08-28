import { deposit } from "./deposit"
import { transfer } from "./transfer"
import { withdraw } from "./withdraw"

export const event = ({
    type,
    origin,
    destination,
    amount
}: {
    type: "deposit" | "withdraw" | "transfer",
    origin?: string,
    destination?: string,
    amount: number
}) => {
    try {
        switch (type) {
            case "deposit":
                if (destination) {
                    const balance = deposit({ destination: destination, amount })

                    return balance
                }

                throw 'destination required'

            case "withdraw":
                if (origin) {
                    const balance = withdraw({ origin: origin, amount })

                    return balance
                }

                throw 'origin required'

            case "transfer":
                if (destination && origin) {
                    const balance = transfer({ destination: destination, origin: origin, amount })

                    return balance
                }

                throw 'origin and destination required'

            default:
                throw 'event not found'
        }
    } catch (err) {
        throw err
    }
}