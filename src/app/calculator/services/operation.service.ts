import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

import { OperationType } from '../enums';
import { CalculationEntry } from '../models';

@Injectable({
    providedIn: 'root',
})
export class OperationService {
    public readonly operations$ = of({
        [OperationType.Addition]: {
            operationType: OperationType.Addition,
            displayName: '+',
        },
        [OperationType.Division]: {
            operationType: OperationType.Division,
            displayName: '/',
        },
        [OperationType.Modulo]: {
            operationType: OperationType.Modulo,
            displayName: '%',
        },
        [OperationType.HighestPrime]: {
            operationType: OperationType.HighestPrime,
            displayName: 'Highest Prime Number',
        },
    });

    private historySub = new BehaviorSubject<CalculationEntry[]>([]);
    public readonly history$ = this.historySub.asObservable();

    public addToHistory(entry: CalculationEntry): void {
        const history = this.historySub.getValue();
        history.push(entry);
        this.historySub.next(history);
    }
}
