import { ERR_DESTINATION_REQUIRED, ERR_ORIGIN_AND_DESTINATION_REQUIRED, ERR_ORIGIN_REQUIRED } from "../../constants";
import { deposit } from "./methods/deposit";
import { transfer } from "./methods/transfer";
import { withdraw } from "./methods/withdraw";


export interface EventStrategy {
    execute(params: {
        origin?: string;
        destination?: string;
        amount: number;
    }): any;
}

export class DepositStrategy implements EventStrategy {
    execute({ destination, amount }: { destination?: string; amount: number }) {
        if (!destination) throw ERR_DESTINATION_REQUIRED;
        return deposit({ destination, amount });
    }
}

export class WithdrawStrategy implements EventStrategy {
    execute({ origin, amount }: { origin?: string; amount: number }) {
        if (!origin) throw ERR_ORIGIN_REQUIRED;
        return withdraw({ origin, amount });
    }
}

export class TransferStrategy implements EventStrategy {
    execute({
        origin,
        destination,
        amount
    }: {
        origin?: string;
        destination?: string;
        amount: number;
    }) {
        if (!origin || !destination) throw ERR_ORIGIN_AND_DESTINATION_REQUIRED;
        return transfer({ origin, destination, amount });
    }
}