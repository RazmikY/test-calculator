import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CalculatorOperationsComponent } from './calculator-operations.component';

describe('CalculatorOperationsComponent', () => {
    let component: CalculatorOperationsComponent;
    let fixture: ComponentFixture<CalculatorOperationsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [CalculatorOperationsComponent, ReactiveFormsModule],
        });
        fixture = TestBed.createComponent(CalculatorOperationsComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form correctly', () => {
        const controls = component.form.controls;
        expect(component.form).toBeDefined();
        expect(controls.operand1.value).toBe('');
        expect(controls.operand2.value).toBe('');
        expect(controls.selectedOperation.value).toBe('');
    });

    it('should set value to form fields', () => {
        const controls = component.form.controls;
        fixture.detectChanges();
        const operand1 = fixture.debugElement.query(
            By.css('#operand1')
        ).nativeNode;
        const operand2 = fixture.debugElement.query(
            By.css('#operand2')
        ).nativeNode;

        operand1.value = '52';
        operand2.value = '25';
        operand1.dispatchEvent(new Event('input'));
        operand2.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(controls.operand1.value as unknown).toBe(52);
        expect(controls.operand2.value as unknown).toBe(25);
    });

    it('should check calculate button is disabled', () => {
        fixture.detectChanges();
        const button = fixture.debugElement.query(
            By.css('button')
        ).nativeElement;

        expect(component.disabled).toBeTrue();
        expect(button.disabled).toBeTrue();
        expect(component.form.invalid).toBeTrue();

        component.form.controls.operand1.setValue('5');
        component.form.controls.operand2.setValue('15');
        component.form.controls.selectedOperation.setValue('0');

        expect(component.disabled).toBeFalse();
        expect(component.form.invalid).toBeFalse();
        expect(component.form.valid).toBeTrue();

        component.form.get('operand1')?.setValue(null);
        expect(component.disabled).toBeTrue();
        expect(component.form.invalid).toBeTrue();
    });

    it('should emit action when form is valid and button was clicked.', () => {
        const spy = spyOn(component.calculate, 'emit');

        component.form.controls.operand1.setValue('5');
        component.form.controls.operand2.setValue('15');
        component.form.controls.selectedOperation.setValue('0');

        component.onCalculate();

        fixture.whenStable().then(() => {
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledWith({
                entry: {
                    operand1: 5,
                    operand2: 15,
                    operationType: 0,
                },
            });
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    it('should reset form', () => {
        const controls = component.form.controls;

        controls.operand1.setValue('5');
        controls.operand2.setValue('15');
        controls.selectedOperation.setValue('0');
        (component as any).resetForm();

        expect(component.form.invalid).toBeTrue();
    });
});
