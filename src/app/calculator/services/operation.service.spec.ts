import { TestBed } from '@angular/core/testing';

import { OperationService } from './operation.service';
import { OperationType } from '../enums';
import { CalculationEntry } from '../models';

describe('OperationService', () => {
    let service: OperationService;

    beforeEach(() => {
        TestBed.configureTestingModule({ providers: [OperationService] });
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

    it('should call signal update method', () => {
        const update = spyOn(
            (service as any)._historySignal,
            'update'
        ).and.returnValue([]);

        service.addToHistory({} as CalculationEntry);

        expect(update)
            .withContext('update method was not call')
            .toHaveBeenCalled();
    });

    it('should add entry to history', () => {
        const entry: CalculationEntry = {
            operand1: 5,
            operand2: 3,
            operationType: OperationType.Addition,
            result: 8,
            entryId: 1,
        };

        service.addToHistory(entry);

        expect((service as any).history().length).withContext('history length is not 1').toBe(1);

        entry.entryId = 2;
        service.addToHistory(entry);
        expect((service as any).history().length).toBe(2);
    });
});
