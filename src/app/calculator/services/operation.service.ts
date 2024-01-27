import { Injectable, signal } from '@angular/core';

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

    private _historySignal = signal<CalculationEntry[]>([]);
    public readonly history = this._historySignal.asReadonly();

    public addToHistory(entry: CalculationEntry): void {
        this._historySignal.update(history => [...history, entry ]);
    }
}
