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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form correctly', () => {
        expect(component.form).toBeDefined();
        expect(component.form.controls['operand1'].value).toBeNull();
        expect(component.form.controls['operand2'].value).toBeNull();
        expect(component.form.controls['selectedOperation'].value).toBeNull();
    });

    it('should set value to form fields', () => {
        const operand1 = fixture.debugElement.query(
            By.css('#operand1')
        ).nativeElement;
        const operand2 = fixture.debugElement.query(
            By.css('#operand2')
        ).nativeElement;

        operand1.value = 52;
        operand2.value = 25;

        operand1.dispatchEvent(new Event('input'));
        operand2.dispatchEvent(new Event('input'));

        fixture.detectChanges();

        expect(component.form.get('operand1')?.value).toBe(52);
        expect(component.form.get('operand2')?.value).toBe(25);
    });

    it('should check calculate button is disabled', () => {
        const button = fixture.debugElement.query(
            By.css('button')
        ).nativeElement;

        expect(component.disabled).toBeTrue();
        expect(button.disabled).toBeTrue();
        expect(component.form.invalid).toBeTrue();

        component.form.get('operand1')?.setValue(5);
        component.form.get('operand2')?.setValue(15);
        component.form.get('selectedOperation')?.setValue(0);

        fixture.detectChanges();

        expect(component.disabled).toBeFalse();
        expect(component.form.invalid).toBeFalse();
        expect(component.form.valid).toBeTrue();

        component.form.get('operand1')?.setValue(null);
        expect(component.disabled).toBeTrue();
        expect(component.form.invalid).toBeTrue();
    });

    it('should emit action when form is valid and button was clicked.', () => {
        const spy = spyOn(component.onCalculate, 'emit');

        component.form.get('operand1')?.setValue(5);
        component.form.get('operand2')?.setValue(15);
        component.form.get('selectedOperation')?.setValue(0);

        component.calculate();

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

    it('should reset form', () => {
        component.form.get('operand1')?.setValue(5);
        component.form.get('operand2')?.setValue(15);
        component.form.get('selectedOperation')?.setValue(0);

        (component as any).resetForm();

        expect(component.form.invalid).toBeTrue();
        expect(component.form.invalid).toBeTrue();
    });
});
