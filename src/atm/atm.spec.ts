import { ATM } from './atm';
import { InvalidParamError } from './invalid-param-error';

describe('ATM', () => {
    it('should have some specific returns', () => {
        const values = [100, 50, 20, 10];
        const amounts = [10, 10, 10, 10];
        const variation = new Array(values.length).fill(0);
        const withdrawAmount = 300;
        const result = ATM.solutions(values, amounts, variation, withdrawAmount, 0);

        const result1 = [2, 2, 0, 0];
        const result2 = [1, 3, 2, 1];

        expect(result.some(element => areEquals(element, result1))).toBeTruthy();
        expect(result.some(element => areEquals(element, result2))).toBeTruthy();
    });

    it('should return two configurations: one with more higher bills, another with more lower bills', () => {
        const values = [13, 7, 4];
        const amounts = [10, 10, 10];
        const atm = new ATM(values, amounts);

        for (let i = 20; i < 300; i ++) {
            testConfigurationFor(atm, i);
        }
    });

    it('should throw if values length is different than amounts length or variation length', () => {
        const values1 = [100, 50, 20, 10];
        const amounts1 = [10, 10, 10];
        const variation1 = new Array(values1.length).fill(0);

        expect(() => {
            ATM.solutions(values1, amounts1, variation1, 300, 0);
        }).toThrow(InvalidParamError);

        const values2 = [100, 50, 20];
        const amounts2 = [10, 10, 10, 10];
        expect(() => {
            ATM.solutions(values2, amounts2, variation1, 300, 0);
        }).toThrow(InvalidParamError);

        const variation2 = [0];
        expect(() => {
            ATM.solutions(values2, amounts2, variation2, 300, 0);
        }).toThrow(InvalidParamError);
    });

    it('should throw if values are not in descending order', () => {
        const values = [200, 100, 20, 50, 10];
        const amounts = [10, 10, 10, 10, 10];
        expect(() => {
          new ATM(values, amounts)
        }).toThrow(InvalidParamError)

        expect(() => {
            ATM.solutions(values, amounts, new Array(values.length).fill(0), 30, 0);
          }).toThrow(InvalidParamError)
    });

    //
    // Helpers
    //

    function areEquals(arr1: number[], arr2: number[]) {
        if (arr1.length === arr2.length && arr1.every(function(value, index) { return value === arr2[index]})) {
            return true;
        }
        return false;
    };

    function Summation(arr: number[]): number {
        if (typeof arr === "undefined") {
            return 0;
        }
        return arr.reduce((x: number, y: number) => x + y, 0);
    };

    function testConfigurationFor(machine: ATM, amount: number) {
        const configurations = machine.getConfigurations(amount);
        const higherBills = Summation(configurations.moreHigherBills);
        const lowerBills = Summation(configurations.moreLowerBills);

        expect(higherBills).toBeLessThanOrEqual(lowerBills);
    }
});
