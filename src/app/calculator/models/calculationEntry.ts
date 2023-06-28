import { OperationType } from '../enums';

export interface CalculationEntry {
    operand1: number;
    operand2: number;
    operationType: OperationType;
    result: number;
    entryId: number;
}
