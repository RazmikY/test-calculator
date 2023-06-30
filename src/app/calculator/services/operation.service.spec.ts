import { TestBed } from '@angular/core/testing';

import { OperationService } from './operation.service';
import { OperationType } from '../enums';
import { CalculationEntry } from '../models';

describe('OperationService', () => {
    let service: OperationService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OperationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should provide operations', () => {
        expect(service.operations).toEqual([
            {
                operationType: OperationType.Addition,
                displayName: '+',
            },
            {
                operationType: OperationType.Division,
                displayName: '/',
            },
            {
                operationType: OperationType.Modulo,
                displayName: '%',
            },
            {
                operationType: OperationType.HighestPrime,
                displayName: 'Highest Prime Number',
            },
        ]);
    });

    it('should add entry to history', () => {
        const entry: CalculationEntry = {
            operand1: 5,
            operand2: 3,
            operationType: OperationType.Addition,
            result: 8,
            entryId: 1,
        };

        const getValue = spyOn(
            (service as any).historySub,
            'getValue'
        ).and.returnValue([]);
        const next = spyOn((service as any).historySub, 'next');

        service.addToHistory(entry);

        expect(getValue).toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith([entry]);
        expect((service as any).historySub.getValue().length).toBe(1);

        entry.entryId = 2;
        service.addToHistory(entry);
        expect((service as any).historySub.getValue().length).toBe(2);
    });
});
