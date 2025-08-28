import { accountRepository } from "../main"

export const getBalance = ({ id }: { id: string }) => {
    const balance = accountRepository.getBalance({ id: id })
    return balance
}