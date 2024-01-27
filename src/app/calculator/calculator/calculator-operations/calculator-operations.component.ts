import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CalculationEntry, Operation } from '../../models';

@Component({
    selector: 'app-calculator-operations',
    standalone: true,
    imports: [ ReactiveFormsModule],
    templateUrl: './calculator-operations.component.html',
    styleUrls: ['./calculator-operations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorOperationsComponent {
    @Input() operations: Operation[] | null = null;
    @Output() calculate = new EventEmitter<{
        entry: Partial<CalculationEntry>;
    }>();
    public form = this.initForm();

    constructor(private fb: FormBuilder) {}

    private initForm() {
        return this.fb.group({
            operand1: ['', [Validators.required]],
            operand2: ['', [Validators.required]],
            selectedOperation: ['', [Validators.required]],
        });
    }

    public onCalculate(): void {
        const entry = {
            operand1: +this.getValue('operand1'),
            operand2: +this.getValue('operand2'),
            operationType: +this.getValue('selectedOperation'),
        };
        this.calculate.emit({ entry });
    }

    private getValue(name: string): number {
        return this.form.get(name)?.value;
    }

    get disabled(): boolean {
        return this.form.invalid;
    }

    public resetForm(): void {
        this.form.reset();
    }
}
