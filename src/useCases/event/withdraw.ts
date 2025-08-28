import { ERR_ACCOUNT_NOT_EXIST } from "../../constants"
import { accountRepository } from "../../main"

export const withdraw = ({ origin, amount }: { origin: string, amount: number }) => {
    try {
        const balance = accountRepository.withdraw({ origin: origin, amount: amount })
        return balance
    } catch (err) {
        if (err === ERR_ACCOUNT_NOT_EXIST) {
            throw 0
        }

        throw err
    }
}
