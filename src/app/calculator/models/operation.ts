import { OperationType } from '../enums';

export interface Operation {
    readonly displayName: string;
    readonly operationType: OperationType;
}
