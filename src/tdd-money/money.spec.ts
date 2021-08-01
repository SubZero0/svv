import { Money } from './money'

describe('Money', () => {
    it('should correctly handle dollar multiplication', () => {
        const five: Money = Money.dollar(5)
        const ten: Money = Money.dollar(10)
        const fifteen: Money = Money.dollar(15)
        expect(five.times(2).equals(ten)).toBeTruthy()
        expect(five.times(3).equals(fifteen)).toBeTruthy()
    })

    it('should correctly handle money equality', () => {
        expect(Money.dollar(5).equals(Money.dollar(5))).toBeTruthy()
        expect(Money.dollar(5).equals(Money.dollar(6))).toBeFalsy()
        expect(Money.dollar(5).equals(Money.euro(5))).toBeFalsy()
    })

    it('should correctly handle currencies', () => {
        expect(Money.dollar(1).currency()).toEqual('USD')
        expect(Money.euro(1).currency()).toEqual('EUR')
    })
})
