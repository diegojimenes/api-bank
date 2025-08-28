import { accountRepository } from "../../main"

export const transfer = ({ origin, destination, amount }: { origin: string, destination: string, amount: number }) => {
    try {
        const balance = accountRepository.transfer({ origin: origin, destination: destination, amount: amount })
        return balance
    } catch (err) {
        if (err === "account does not exist") {
            throw 0
        }

        throw err
    }
}