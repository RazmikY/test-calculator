import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';

import { CalculatorHistoryComponent } from './calculator-history.component';
import { CalculationEntry } from '../../models';
import { OperationType } from '../../enums';

const history: CalculationEntry[] = [
    {
        entryId: 1,
        operand1: 2,
        operand2: 3,
        operationType: OperationType.Addition,
        result: 5,
    },
    {
        entryId: 2,
        operand1: 4,
        operand2: 2,
        operationType: OperationType.Division,
        result: 2,
    },
];

describe('CalculatorHistoryComponent', () => {
    let component: CalculatorHistoryComponent;
    let fixture: ComponentFixture<CalculatorHistoryComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CalculatorHistoryComponent, MockOperationNamePipe],
        });
        fixture = TestBed.createComponent(CalculatorHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set input properties correctly', () => {
        const operationDisplayNames = {
            [OperationType.Addition]: '+',
            [OperationType.Division]: '/',
        } as Record<OperationType, string>;

        component.history$ = of(history);
        component.operationDisplayNames = operationDisplayNames;

        fixture.detectChanges();

        component.history$.subscribe(_history => {
            _history.forEach((_, index) => {
                expect(history[index].result).toEqual(history[index].result)
            })
        })
        expect(component.operationDisplayNames).withContext('operationDisplayNames').toEqual(operationDisplayNames);
    });

    it('should track entries by entryId', () => {
        const index = 1;
        const entry = history[1];

        const trackByResult = component.trackByEntryId(index, entry);

        expect(trackByResult).toEqual(entry.entryId);
    });
});

@Component({ selector: 'app-operation-name', template: '' , standalone: true})
class MockOperationNamePipe {
    @Input() operation: string | null = null;
}
