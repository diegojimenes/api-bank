import { accountRepository } from "../../main"

export const withdraw = ({ origin, amount }: { origin: string, amount: number }) => {
    try {
        const balance = accountRepository.withdraw({ origin: origin, amount: amount })
        return balance
    } catch (err) {
        if (err === "account does not exist") {
            throw 0
        }

        throw err
    }
}
