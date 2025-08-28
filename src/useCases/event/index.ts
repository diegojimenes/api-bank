import { DepositStrategy, TransferStrategy, WithdrawStrategy } from "./EventStrategy";

export interface EventStrategy {
    execute(params: {
        origin?: string;
        destination?: string;
        amount: number;
    }): any;
}

type eventType = "deposit" | "withdraw" | "transfer"

const strategies: Record<eventType, EventStrategy> = {
    deposit: new DepositStrategy(),
    withdraw: new WithdrawStrategy(),
    transfer: new TransferStrategy(),
};


export const event = ({
    type,
    origin,
    destination,
    amount
}: {
    type: eventType,
    origin?: string,
    destination?: string,
    amount: number
}) => {
    try {
        const strategy = strategies[type];
        if (!strategy) throw "event not found";

        return strategy.execute({ origin, destination, amount });
    } catch (err) {
        throw err
    }
}