import { OperationNamePipe } from './operation-name.pipe';

const data = {
    0: '+',
    1: '/',
    2: '%',
};

describe('OperationNamePipe', () => {
    it('create an instance', () => {
        const pipe = new OperationNamePipe();
        expect(pipe).toBeTruthy();
    });

    it('should return displayName', () => {
        const pipe = new OperationNamePipe();

        expect(pipe.transform(0, data)).toBe('+');
        expect(pipe.transform(2, data)).toBe('%');
        expect(pipe.transform(1, data)).toBe('/');
        expect(pipe.transform(4 as any, data)).toBeUndefined();
    });
});
