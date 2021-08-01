export class Money {
    private readonly amount: number
    private readonly _currency: string
    constructor(amount: number, currency: string) {
        this.amount = amount
        this._currency = currency
    }

    static dollar(amount: number): Money {
        return new Money(amount, 'USD')
    }

    static euro(amount: number): Money {
        return new Money(amount, 'EUR')
    }

    currency(): string {
        return this._currency
    }

    equals(other: Money): boolean {
        if (this._currency !== other._currency) {
            return false
        }
        return other.amount === this.amount
    }

    times(multiplier: number): Money {
        return new Money(this.amount * multiplier, this._currency)
    }
}
