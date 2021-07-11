import { InvalidParamError } from './invalid-param-error';

export class ATM {
    private readonly values: number[];
    private readonly amounts: number[];

    constructor (values: number[], amounts: number[]) {
        if (values.length != amounts.length) {
            throw new InvalidParamError("Values length doesn't match amount length");
        }
        if (!ATM.isDescending(values)) {
            throw new InvalidParamError("Values must be in descending order");
        }

        this.values = values;
        this.amounts = amounts;
    }

    public getConfigurations(amount: number): Configurations {
        const solutions = ATM.solutions([...this.values], [...this.amounts], new Array(this.values.length).fill(0), amount, 0);
        const configs: Configurations = {
            moreHigherBills: solutions[0],
            moreLowerBills: solutions[solutions.length - 1]
        }
        return configs;
    }

    public static solutions(values: number[], amounts: number[], variation: number[], amount: number, position: number): number[][] {
        if (values.length != amounts.length) {
            throw new InvalidParamError("Values length doesn't match amount length");
        }
        if (values.length != variation.length) {
            throw new InvalidParamError("Values length doesn't match variation length");
        }
        if (!ATM.isDescending(values)) {
            throw new InvalidParamError("Values must be in descending order");
        }

        const list: number[][] = [];
        const value: number = ATM.compute(values, variation);

        if (value < amount) {
            for (let i = position; i < values.length; i++) {
                if (amounts[i] > variation[i]) {
                    const newVariation: number[] = [...variation];
                    newVariation[i]++;
                    const newList: number[][] = ATM.solutions(values, amounts, newVariation, amount, i);
                    if (newList != null) {
                        list.push(...newList);
                    }
                }
            }
        } else if (value === amount) {
            list.push([...variation]);
        }

        return list;
    }

    public static compute(values: number[], variation: number[]): number {
        var ret = 0;
        for (let i = 0; i < variation.length; i++) {
            ret += values[i] * variation[i];
        }
        return ret;
    }

    public static isDescending(values: number[]): boolean {
        for (let i = 1; i < values.length; i++) {
            if (values[i] > values[i - 1]) {
                return false;
            }
        }
        return true;
    }
}

export interface Configurations {
    moreHigherBills: number[];
    moreLowerBills: number[];
}
