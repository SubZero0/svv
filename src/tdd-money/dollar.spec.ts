import { Dollar } from './dollar'

describe('Dollar', () => {
    it('should be 10 when five dollars are multiplied by two', () => {
        const dollars = new Dollar(5)
        dollars.times(2)
        expect(dollars.amount).toBe(10)
    })
})
