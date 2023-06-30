import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { OperationType } from '../enums';
import { CalculationEntry } from '../models';

@Injectable({
    providedIn: 'root',
})
export class OperationService {
    public readonly operations = [
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
    ];

    private historySub = new BehaviorSubject<CalculationEntry[]>([]);
    public readonly history$ = this.historySub.asObservable();

    public addToHistory(entry: CalculationEntry): void {
        const history = this.historySub.getValue();
        history.push(entry);
        this.historySub.next(history);
    }
}
