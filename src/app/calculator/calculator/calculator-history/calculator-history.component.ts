import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, DecimalPipe } from '@angular/common';

import { CalculationEntry } from '../../models';
import { OperationNamePipe } from '../../pipes';
import { OperationType } from '../../enums';

@Component({
    selector: 'app-calculator-history',
    standalone: true,
    imports: [NgFor, OperationNamePipe, DecimalPipe],
    templateUrl: './calculator-history.component.html',
    styleUrls: ['./calculator-history.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorHistoryComponent {
    @Input() history: CalculationEntry[] | null = [];
    @Input() operationDisplayNames: Record<OperationType, string> | null = null;

    trackByEntryId(index: number, entry: CalculationEntry): number {
        return entry.entryId;
    }
}
