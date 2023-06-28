import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CalculatorComponent } from './calculator/calculator/calculator.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CalculatorComponent],
})
export class AppComponent {}
