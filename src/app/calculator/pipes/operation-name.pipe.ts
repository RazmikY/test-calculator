import { Pipe, PipeTransform } from '@angular/core';
import { OperationType } from '../enums';


@Pipe({
    name: 'operationName',
    standalone: true,
})
export class OperationNamePipe implements PipeTransform {
    transform<T extends OperationType>(value: T, data: Record<T, string>): string {
        return data[value];
    }
}
