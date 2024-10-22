import { EmptyStackException, StackOverFlowException } from '$lib/chip8/Exceptions';

export class Stack {
    private readonly MAX_SIZE: number = 1024;

    private _memory: number[] = [];

    push(value: number): void {
        this._memory.push(value);
        if (this._memory.length > this.MAX_SIZE) {
            throw new StackOverFlowException();
        }
    }

    pop(): number {
        if (this._memory.length === 0) {
            throw new EmptyStackException();
        }
        return this._memory.pop() as number;
    }
}
