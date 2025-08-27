import { AccountRepository } from './accountRepository';

describe('Tests for the accountRepository class', () => {
    let accountRepository;

    beforeEach(() => {
        accountRepository = new AccountRepository();
    });

    test('should reset the accountRepository', () => {
        accountRepository.createAccount({ id: '100', balance: 10 });
        accountRepository.reset();

        const account = accountRepository.findAccount({ id: '100' });

        expect(account).toBeUndefined();
    });

    test('should throw an exception when getting balance for a non-existing account', () => {
        expect(() => accountRepository.getBalance({ id: '1234' })).toThrow();
    });

    test('should create a new account with an initial deposit', () => {
        const result = accountRepository.deposit({ destination: '100', amount: 10 });

        expect(result).toEqual({ destination: { id: '100', balance: 10 } });

        const account = accountRepository.findAccount({ id: '100' });

        expect(account).toEqual({ id: '100', balance: 10 });
    });

    test('should deposit into an existing account', () => {
        accountRepository.createAccount({ id: '100', balance: 10 });

        const result = accountRepository.deposit({ destination: '100', amount: 10 });

        expect(result).toEqual({ destination: { id: '100', balance: 20 } });

        const account = accountRepository.findAccount({ id: '100' });

        expect(account.balance).toBe(20);
    });

    test('should return the correct balance for an existing account', () => {
        accountRepository.createAccount({ id: '100', balance: 20 });

        const balance = accountRepository.getBalance({ id: '100' });

        expect(balance).toBe(20);
    });

    test('should throw an exception when withdrawing from a non-existing account', () => {
        expect(() => accountRepository.withdraw({ origin: '200', amount: 10 })).toThrow("account does not exist");
    });

    test('should withdraw from an existing account with sufficient balance', () => {
        accountRepository.createAccount({ id: '100', balance: 20 });

        const result = accountRepository.withdraw({ origin: '100', amount: 5 });

        expect(result).toEqual({ origin: { id: '100', balance: 15 } });

        const account = accountRepository.findAccount({ id: '100' });

        expect(account.balance).toBe(15);
    });

    test('should not withdraw from an account with insufficient balance', () => {
        accountRepository.createAccount({ id: '100', balance: 5 });

        expect(() => accountRepository.withdraw({ origin: '100', amount: 10 })).toThrow("operation denied due to lack of balance");
    });


    test('should successfully transfer from an existing account to a new account', () => {
        accountRepository.createAccount({ id: '100', balance: 15 });

        const result = accountRepository.transfer({ origin: '100', destination: '300', amount: 15 });

        expect(result).toEqual({
            origin: { origin: { id: '100', balance: 0 } },
            destination: { destination: { id: '300', balance: 15 } }
        });

        const originAccount = accountRepository.findAccount({ id: '100' });

        const destinationAccount = accountRepository.findAccount({ id: '300' });

        expect(originAccount.balance).toBe(0);

        expect(destinationAccount.balance).toBe(15);
    });

    test('should throw an exception when trying to transfer from a non-existing account', () => {
        expect(() => accountRepository.transfer({ origin: '200', amount: 15, destination: '300' })).toThrow("account does not exist");
    });

    test('should not transfer from an account with insufficient balance', () => {
        accountRepository.createAccount({ id: '100', balance: 5 });

        expect(() => accountRepository.transfer({ origin: '100', amount: 15, destination: '300' })).toThrow("operation denied due to lack of balance");
    });
});
