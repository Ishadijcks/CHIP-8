import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import { type Chip8 } from '../Chip8';
import { type InstructionData } from '$lib/chip8/InstructionData';

export class SetRegisterInstruction extends BaseInstruction {
    public name: string = 'SetRegisterInstruction';

    constructor(data: InstructionData) {
        super(data);
        this.parseXNN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0x6;
    }

    public getDescription(): string {
        return `Set register V${this.x.toString(16)} to ${this.n}`;
    }

    public execute(chip8: Chip8): void {
        chip8.vRegisters[this.x].set(this.n);
    }
}
