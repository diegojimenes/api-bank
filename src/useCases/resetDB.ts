import { accountRepository } from "../main"

export const resetDB = () => {
    accountRepository.reset()

    return
}