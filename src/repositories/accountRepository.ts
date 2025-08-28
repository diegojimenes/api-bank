import { ERR_ACCOUNT_NOT_EXIST, ERR_OPERATION_DENIED } from "../constants"

interface IAccount {
    id: string,
    balance: number
}

export class AccountRepository {
    private base: IAccount[]

    constructor() {
        this.base = []
    }

    reset() {
        this.base = []
    }

    findAccount({ id }: { id: string }) {
        return this.base.find((account) => account.id === id)
    }

    createAccount({ id, balance }: { id: string, balance?: number }) {
        this.base = [...this.base, {
            id,
            balance: balance ? balance : 0
        }]
    }

    getBalance({ id }: { id: string }) {
        const account = this.findAccount({ id })

        if (!account) {
            this.createAccount({ id })
            throw ERR_ACCOUNT_NOT_EXIST
        }

        return account.balance
    }

    deposit({ destination, amount }: { destination: string, amount: number }) {
        const account = this.findAccount({ id: destination })

        if (!account) {
            this.createAccount({ id: destination, balance: amount })
            return { destination: { id: destination, balance: amount } }
        }

        const newBase = this.base.map((acc) =>
            acc.id === destination
                ? { ...acc, balance: acc.balance + amount }
                : acc
        )

        this.base = newBase

        const accountUpdated = this.findAccount({ id: destination })
        return { destination: { id: destination, balance: accountUpdated?.balance } }
    }

    withdraw({ origin, amount }: { origin: string, amount: number }) {
        const account = this.findAccount({ id: origin })

        if (!account) {
            throw ERR_ACCOUNT_NOT_EXIST
        }

        if (account.balance < amount) {
            throw ERR_OPERATION_DENIED
        }

        const newBase = this.base = this.base.map((acc) =>
            acc.id === origin
                ? { ...acc, balance: acc.balance - amount }
                : acc
        )

        this.base = newBase

        const accountUpdated = this.findAccount({ id: origin })
        return { origin: { id: origin, balance: accountUpdated?.balance } }
    }

    transfer({ origin, destination, amount }: { origin: string, destination: string, amount: number }) {
        const accountOrigin = this.findAccount({ id: origin })

        if (!accountOrigin) {
            throw ERR_ACCOUNT_NOT_EXIST
        }

        if (accountOrigin.balance < amount) {
            throw ERR_OPERATION_DENIED
        }

        const originNewBalance = this.withdraw({ origin, amount })

        if (typeof originNewBalance === "object") {
            const destinationNewBalance = this.deposit({ destination, amount })
            return {
                ...originNewBalance,
                ...destinationNewBalance
            }
        }
    }
}