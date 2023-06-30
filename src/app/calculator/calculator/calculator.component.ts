import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorOperationsComponent } from './calculator-operations/calculator-operations.component';
import { CalculatorHistoryComponent } from './calculator-history/calculator-history.component';
import { CalculationEntry, Operation } from '../models';
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
    @ViewChild('operationComp') operationComp!: CalculatorOperationsComponent
    private operationService = inject(OperationService);
    private calculationService = inject(CalculationService);

    public history$ = this.operationService.history$;
    public operations = this.operationService.operations;
    public operationDisplayNames = this.getOperationsDisplayNames(
        this.operations
    );

    public calculate({ entry }: { entry: Partial<CalculationEntry> }): void {
        const newEntry = this.calculationService.calculate(
            entry as CalculationEntry
        );
        this.operationService.addToHistory(newEntry);
        this.operationComp.resetForm();
    }

    private getOperationsDisplayNames(
        operations: Operation[]
    ): Record<OperationType, string> {
        const displayNames = {} as Record<OperationType, string>;
        for (const operation of operations) {
            displayNames[operation.operationType] = operation.displayName;
        }
        return displayNames;
    }
}
