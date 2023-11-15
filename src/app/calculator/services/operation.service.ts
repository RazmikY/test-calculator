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

    private _historySub = new BehaviorSubject<CalculationEntry[]>([]);
    public readonly history$ = this._historySub.asObservable();

    public addToHistory(entry: CalculationEntry): void {
        const history = [...this._historySub.getValue(), entry];
        this._historySub.next(history);
    }
}
