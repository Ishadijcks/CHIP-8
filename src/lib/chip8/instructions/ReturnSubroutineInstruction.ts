import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import { type Chip8 } from '../Chip8';
import { type InstructionData } from '$lib/chip8/InstructionData';

export class ReturnSubroutineInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
    }

    public static matches(data: InstructionData): boolean {
        return data.value === 0x00ee;
    }

    public getDescription(): string {
        return `Return to top of the stack`;
    }

    public execute(chip8: Chip8): void {
        chip8.pc = chip8.stack.pop();
    }
}
