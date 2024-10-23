import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import { type Chip8 } from '../Chip8';
import { type InstructionData } from '$lib/chip8/InstructionData';

export class JumpInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseNNN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0x1;
    }

    public getDescription(): string {
        return `Jump to ${this.n}`;
    }

    public execute(chip8: Chip8): void {
        chip8.pc = this.n;
    }
}
