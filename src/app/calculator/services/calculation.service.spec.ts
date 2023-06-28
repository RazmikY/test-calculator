import { TestBed } from '@angular/core/testing';

import { CalculationService } from './calculation.service';
import { CalculationEntry } from '../models';
import { OperationType } from '../enums';

describe('CalculationService', () => {
    let service: CalculationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should calculate addition correctly', () => {
        const entry: CalculationEntry = {
            operand1: 5,
            operand2: 3,
            operationType: OperationType.Addition,
            result: 8,
            entryId: 1,
        };

        const calculatedEntry = service.calculate(entry);

        expect(calculatedEntry).toEqual(entry);
    });

    it('should calculate division correctly', () => {
        const entry: CalculationEntry = {
            operand1: 10,
            operand2: 2,
            operationType: OperationType.Division,
            result: 5,
            entryId: 1,
        };

        const calculatedEntry = service.calculate(entry);

        expect(calculatedEntry).toEqual(entry);
    });

    it('should calculate modulo correctly', () => {
        const entry: CalculationEntry = {
            operand1: 10,
            operand2: 3,
            operationType: OperationType.Modulo,
            result: 1,
            entryId: 1,
        };

        const calculatedEntry = service.calculate(entry);

        expect(calculatedEntry).toEqual(entry);
    });

    it('should calculate highest prime number correctly', () => {
        const entry: CalculationEntry = {
            operand1: 1,
            operand2: 10,
            operationType: OperationType.HighestPrime,
            result: 7,
            entryId: 1,
        };

        const calculatedEntry = service.calculate(entry);

        expect(calculatedEntry).toEqual(entry);
    });

    it('should throw error for invalid operands', () => {
        const entry: CalculationEntry = {
            operand1: NaN,
            operand2: 5,
            operationType: OperationType.Addition,
            result: 0,
            entryId: 1,
        };

        expect(() => service.calculate(entry)).toThrowError(
            'Invalid operands. Please provide valid numbers.'
        );
    });

    it('should throw error for invalid operation', () => {
        const entry: CalculationEntry = {
            operand1: 5,
            operand2: 3,
            operationType: 8 as OperationType,
            result: 0,
            entryId: 1,
        };

        expect(() => service.calculate(entry)).toThrowError(
            'Invalid operation. Please select a valid operation.'
        );
    });
});
