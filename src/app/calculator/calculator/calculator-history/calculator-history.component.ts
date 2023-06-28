import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { CalculationEntry } from '../../models';
import { OperationNamePipe } from '../../pipes';
import { OperationType } from '../../enums';

@Component({
    selector: 'app-calculator-history',
    standalone: true,
    imports: [CommonModule, OperationNamePipe],
    templateUrl: './calculator-history.component.html',
    styleUrls: ['./calculator-history.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorHistoryComponent {
    @Input() history$!: Observable<CalculationEntry[]> | null;
    @Input() operationDisplayNames: Record<OperationType, string> | null = null;

    trackByEntryId(index: number, entry: CalculationEntry): number {
        return entry.entryId;
    }
}
