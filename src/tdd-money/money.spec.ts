import { Bank } from './bank'
import { Expression } from './expression'
import { Money } from './money'
import { Sum } from './sum'

describe('Money', () => {
    it('should handle dollar multiplication', () => {
        const five: Money = Money.dollar(5)
        const ten: Money = Money.dollar(10)
        const fifteen: Money = Money.dollar(15)
        expect(five.times(2)).toEqual(ten)
        expect(five.times(3)).toEqual(fifteen)
    })

    it('should handle money equality', () => {
        expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy()
        expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy()
        expect(Money.dollar(5).equals(Money.euro(5))).toBeFalsy()
    })

    it('should handle currencies', () => {
        expect(Money.dollar(1).currency()).toEqual('USD')
        expect(Money.euro(1).currency()).toEqual('EUR')
    })

    it('should handle simple addition', () => {
        const five = Money.dollar(5)
        const ten = Money.dollar(10)
        const sum: Expression = five.plus(ten)
        const bank = new Bank()
        const reduced: Money = bank.reduce(sum, 'USD')
        expect(reduced.equals(Money.dollar(15))).toBeTruthy()
    })

    it('should return a sum when plus is used', () => {
        const five = Money.dollar(5)
        const ten = Money.dollar(10)
        const result: Expression = five.plus(ten)
        const sum = result as Sum
        expect(sum.augend).toEqual(five)
        expect(sum.addend).toEqual(ten)
    })

    it('should reduce from a sum', () => {
        const sum: Expression = new Sum(Money.dollar(3), Money.dollar(4))
        const bank = new Bank()
        const result = bank.reduce(sum, 'USD')
        expect(result).toEqual(Money.dollar(7))
    })

    it('should reduce from a money', () => {
        const bank = new Bank()
        const result: Money = bank.reduce(Money.dollar(1), 'USD')
        expect(result).toEqual(Money.dollar(1))
    })

    it('should reduce from different currencies', () => {
        const bank = new Bank()
        bank.addRate('EUR', 'USD', 2)
        const result = bank.reduce(Money.euro(2), 'USD')
        expect(result).toEqual(Money.dollar(1))
    })

    it('should handle identity rate', () => {
        expect(new Bank().rate('USD', 'USD')).toEqual(1)
    })

    it('should handle mixed addition', () => {
        const fiveBucks: Expression = Money.dollar(5)
        const tenEuros: Expression = Money.euro(10)
        const bank = new Bank()
        bank.addRate('EUR', 'USD', 2)
        const result = bank.reduce(fiveBucks.plus(tenEuros), 'USD')
        expect(result).toEqual(Money.dollar(10))
    })

    it('should handle plus operation in a sum', () => {
        const fiveBucks: Expression = Money.dollar(5)
        const tenEuros: Expression = Money.euro(10)
        const bank = new Bank()
        bank.addRate('EUR', 'USD', 2)
        const sum: Expression = new Sum(fiveBucks, tenEuros).plus(fiveBucks)
        const result: Money = bank.reduce(sum, 'USD')
        expect(result).toEqual(Money.dollar(15))
    })

    it('should handle times operation in a sum', () => {
        const fiveBucks: Expression = Money.dollar(5)
        const tenEuros: Expression = Money.euro(10)
        const bank = new Bank()
        bank.addRate('EUR', 'USD', 2)
        const sum: Expression = new Sum(fiveBucks, tenEuros).times(2)
        const result: Money = bank.reduce(sum, 'USD')
        expect(result).toEqual(Money.dollar(20))
    })
})
