import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { CalculationEntry, Operation } from '../../models';

@Component({
    selector: 'app-calculator-operations',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './calculator-operations.component.html',
    styleUrls: ['./calculator-operations.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorOperationsComponent {
    @Input() operations: Operation[] | null = null;
    @Output() onCalculate = new EventEmitter<Partial<CalculationEntry>>();
    public form!: FormGroup;

    constructor(private fb: FormBuilder) {
        this.initForm();
    }

    private initForm(): void {
        this.form = this.fb.group({
            operand1: [null, [Validators.required]],
            operand2: [null, [Validators.required]],
            selectedOperation: [null, [Validators.required]],
        });
    }

    public calculate(): void {
        this.onCalculate.emit({
            operand1: this.getValue('operand1'),
            operand2: this.getValue('operand2'),
            operationType: this.getValue('selectedOperation'),
        });
        this.resetForm();
    }

    private getValue(name: string): number {
        return this.form.get(name)?.value;
    }

    get disabled(): boolean {
        return this.form.invalid;
    }

    private resetForm(): void {
        this.form.reset();
    }
}
