import { ERR_ACCOUNT_NOT_EXIST } from "../../../constants"
import { accountRepository } from "../../../main"

export const transfer = ({ origin, destination, amount }: { origin: string, destination: string, amount: number }) => {
    try {
        const balance = accountRepository.transfer({ origin: origin, destination: destination, amount: amount })
        return balance
    } catch (err) {
        if (err === ERR_ACCOUNT_NOT_EXIST) {
            throw 0
        }

        throw err
    }
}