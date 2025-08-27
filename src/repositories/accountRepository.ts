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
        const data = this.base.find((account) => {
            if (account.id === id) {
                return account
            }
        })

        return data
    }

    createAccount({ id, balance }: { id: string, balance?: number }) {
        this.base.push({
            id: id,
            balance: balance ? balance : 0
        })

        return
    }

    getBalance({ id }: { id: string }) {
        const account = this.findAccount({ id })

        if (!account) {
            this.createAccount({ id })

            throw "account does not exist"
        }

        return account.balance
    }

    deposit({ destination, amount }: { destination: string, amount: number }) {
        const account = this.findAccount({ id: destination })

        if (!account) {
            this.createAccount({ id: destination, balance: amount })

            return { destination: { id: destination, balance: amount } }
        }

        const newBase = this.base.map((account) => {
            if (account.id === destination) {
                return {
                    ...account,
                    balance: account.balance + amount
                }
            }

            return account
        })

        this.base = newBase

        const accountUpdated = this.findAccount({ id: destination })

        return { destination: { id: destination, balance: accountUpdated?.balance } }
    }

    withdraw({ origin, amount }: { origin: string, amount: number }) {
        const account = this.findAccount({ id: origin })

        if (!account) {
            throw "account does not exist"
        }

        if (account.balance < amount) {
            throw "operation denied due to lack of balance"
        }

        const newBase = this.base.map((account) => {
            if (account.id === origin) {
                return {
                    ...account,
                    balance: account.balance - amount
                }
            }

            return account
        })

        this.base = newBase

        const accountUpdated = this.findAccount({ id: origin })

        return { origin: { id: origin, balance: accountUpdated?.balance } }
    }

    transfer({ origin, destination, amount }: { origin: string, destination: string, amount: number }) {
        const accountOrigin = this.findAccount({ id: origin })

        if (!accountOrigin) {
            throw "account does not exist"
        }

        if (accountOrigin.balance < amount) {
            throw "operation denied due to lack of balance"
        }

        const originNewBalance = this.withdraw({ origin: origin, amount })

        if (typeof originNewBalance == "object") {
            const destinationNewBalance = this.deposit({ destination: destination, amount })

            return {
                origin: originNewBalance,
                destination: destinationNewBalance
            }
        }

    }
}