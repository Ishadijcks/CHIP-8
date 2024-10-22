import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import { type Chip8 } from '../Chip8';
import { type InstructionData } from '$lib/chip8/InstructionData';

export class AddRegisterInstruction extends BaseInstruction {
    public name: string = 'AddRegisterInstruction';

    constructor(data: InstructionData) {
        super(data);
        this.parseXNN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0x7;
    }

    public getDescription(): string {
        return `Add ${this.n} to register V${this.x.toString(16)}`;
    }

    public execute(chip8: Chip8): void {
        chip8.vRegisters[this.x].add(this.n);
    }
}
