import { Dollar } from './dollar'

describe('Dollar', () => {
    it('should be 10 when five dollars are multiplied by two', () => {
        const dollars: Dollar = new Dollar(5)
        expect(dollars.amount).toEqual(5)
        const product: Dollar = dollars.times(2)
        expect(product.amount).toEqual(10)
    })
    it('should return true when dollars with the same amount are compared, otherwise false', () => {
        expect(new Dollar(5).equals(new Dollar(5))).toBeTruthy()
        expect(new Dollar(5).equals(new Dollar(6))).toBeFalsy()
    })
})
