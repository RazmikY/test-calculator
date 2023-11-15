import {
    ChangeDetectionStrategy,
    Component,
    ViewChild,
    inject,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { CalculatorOperationsComponent } from './calculator-operations/calculator-operations.component';
import { CalculatorHistoryComponent } from './calculator-history/calculator-history.component';
import { CalculationEntry, Operation } from '../models';
import { CalculationService, OperationService } from '../services';
import { OperationType } from '../enums';

@Component({
    selector: 'app-calculator',
    standalone: true,
    imports: [
        CalculatorOperationsComponent,
        CalculatorHistoryComponent,
        AsyncPipe,
    ],
    templateUrl: './calculator.component.html',
    styleUrls: ['./calculator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent {
    private operationService = inject(OperationService);
    private calculationService = inject(CalculationService);

    @ViewChild('operationComp') operationComp!: CalculatorOperationsComponent;
    public history$ = this.operationService.history$;
    public operations = this.operationService.operations;
    public operationDisplayNames = this.getOperationsDisplayNames(
        this.operations
    );

    /**
     * This method will calculate the entry and add results to the calculation history
     * @param {{ entry: Partial<CalculationEntry> }}  entry
     */
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
