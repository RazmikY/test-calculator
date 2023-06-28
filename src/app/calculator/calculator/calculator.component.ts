import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

import { CalculatorOperationsComponent } from './calculator-operations/calculator-operations.component';
import { CalculatorHistoryComponent } from './calculator-history/calculator-history.component';
import { CalculationEntry } from '../models';
import { CalculationService, OperationService } from '../services';
import { OperationType } from '../enums';

@Component({
    selector: 'app-calculator',
    standalone: true,
    imports: [
        CommonModule,
        CalculatorOperationsComponent,
        CalculatorHistoryComponent,
    ],
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
    private operationService = inject(OperationService);
    private calculationService = inject(CalculationService);

    public operations$ = this.operationService.operations$.pipe(
        map((operations) => Object.values(operations))
    );

    public history$ = this.operationService.history$;
    public operationDisplayNames$ = this.operations$.pipe(
        map((operations) => {
            const displayNames = {} as Record<OperationType, string>;
            for (const operation of operations) {
                displayNames[operation.operationType] = operation.displayName;
            }
            return displayNames;
        })
    );

    public calculate(data: Partial<CalculationEntry>): void {
        const newEntry = this.calculationService.calculate(
            data as CalculationEntry
        );
        this.operationService.addToHistory(newEntry);
    }
}
