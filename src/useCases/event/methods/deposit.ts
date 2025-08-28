import { accountRepository } from "../../../main"

export const deposit = ({ destination, amount }: { destination: string, amount: number }) => {
    const balance = accountRepository.deposit({ destination: destination, amount: amount })
    return balance
}
