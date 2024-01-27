import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';
import { CalculationEntry } from '../models';

describe('CalculatorComponent', () => {
    let component: CalculatorComponent;
    let fixture: ComponentFixture<CalculatorComponent>;

    const entry = {
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

        component.calculate({ entry });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(entry);
    });

    it('should call addToHistory method', () => {
        const spy = spyOn((component as any).operationService, 'addToHistory');

        component.calculate({ entry });

        expect(spy).toHaveBeenCalled();
    });

    it('should reset form', () => {
        const spy = spyOn(component.operationComp, 'resetForm');

        component.calculate({ entry });

        expect(spy).toHaveBeenCalled();
        expect(component.operationComp.form.invalid).toBeTrue();
        expect(component.operationComp.disabled).toBeTrue();
    });

    it('should add new entry inside history array', () => {
        component.calculate({ entry });

        expect(component.history().length).toBe(1);
    });
});
