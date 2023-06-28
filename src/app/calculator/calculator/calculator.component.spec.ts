import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculationEntry } from '../models';

describe('CalculatorComponent', () => {
    let component: CalculatorComponent;
    let fixture: ComponentFixture<CalculatorComponent>;

    const data = {
        operand1: 52,
        operand2: 25,
        operationType: 0,
    } as CalculationEntry;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CalculatorComponent],
        });
        fixture = TestBed.createComponent(CalculatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call calculate method', () => {
        const spy = spyOn((component as any).calculationService, 'calculate');

        component.calculate(data);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(data);
    });

    it('should call addToHistory method', () => {
        const spy = spyOn((component as any).operationService, 'addToHistory');

        component.calculate(data);

        expect(spy).toHaveBeenCalled();
    });

    it('should add new entry inside history$ array', () => {
        component.calculate(data);

        component.history$.subscribe((history) => {
            expect(history.length).toBe(1);
        });
    });
});
