import { accountRepository } from "../main"

export const restDB = () => {
    accountRepository.reset()

    return
}