import { Injectable } from '@angular/core';

import { CalculationEntry } from '../models';
import { OperationType } from '../enums';

@Injectable({
    providedIn: 'root',
})
export class CalculationService {
    private readonly operations = {
        [OperationType.Addition]: {
            action: (operand1: number, operand2: number) => operand1 + operand2,
        },
        [OperationType.Division]: {
            action: (operand1: number, operand2: number) => operand1 / operand2,
        },
        [OperationType.Modulo]: {
            action: (operand1: number, operand2: number) => operand1 % operand2,
        },
        [OperationType.HighestPrime]: {
            action: (operand1: number, operand2: number) =>
                this.findHighestPrimeNumber(operand1, operand2),
        },
    } as const;

    private entryId = 0;

    public calculate({ operand1, operand2, operationType }: CalculationEntry): CalculationEntry {
        if (isNaN(operand1) || isNaN(operand2)) {
            throw new Error('Invalid operands. Please provide valid numbers.');
        }

        const selectedOperation = this.operations[operationType];

        if (!selectedOperation) {
            throw new Error(
                'Invalid operation. Please select a valid operation.'
            );
        }

        const result = selectedOperation.action(operand1, operand2);

        return {
            operand1,
            operand2,
            operationType,
            result,
            entryId: ++this.entryId,
        };
    }

    private findHighestPrimeNumber(start: number, end: number): number {
        let highestPrime = 0;

        for (let num = start; num <= end; num++) {
            if (this.isPrime(num) && num > highestPrime) {
                highestPrime = num;
            }
        }

        return highestPrime;
    }

    private isPrime(num: number): boolean {
        if (num < 2) {
            return false;
        }

        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false;
            }
        }

        return true;
    }
}
