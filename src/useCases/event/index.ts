import { DepositStrategy, EventStrategy, TransferStrategy, WithdrawStrategy } from "./EventStrategy";

type eventType = "deposit" | "withdraw" | "transfer";

const strategies: Record<eventType, EventStrategy> = {
    deposit: new DepositStrategy(),
    withdraw: new WithdrawStrategy(),
    transfer: new TransferStrategy(),
};

export const event = ({
    type,
    origin,
    destination,
    amount,
}: {
    type: eventType;
    origin?: string;
    destination?: string;
    amount: number;
}) => {
    const strategy = strategies[type];
    if (!strategy) throw "event not found";

    return strategy.execute({ origin, destination, amount });
};