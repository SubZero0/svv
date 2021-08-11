import { Expression } from './expression'
import { Sum } from './sum'

export class Money implements Expression {
    private readonly _amount: number
    private readonly _currency: string
    constructor(amount: number, currency: string) {
        this._amount = amount
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

    plus(addend: Money): Expression {
        return new Sum(this, addend)
    }

    reduce(to: string): Money {
        return this
    }

    equals(other: Money): boolean {
        if (this._currency !== other._currency) {
            return false
        }
        return other._amount === this._amount
    }

    times(multiplier: number): Money {
        return new Money(this._amount * multiplier, this._currency)
    }

    amount(): number {
        return this._amount
    }
}
