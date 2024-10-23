import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import type { Chip8 } from '../Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export class SkipIfRegisterEqualToInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXNN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0x3;
    }

    public getDescription(): string {
        return `Skip if V${this.x.toString(16)} == ${this.n}`;
    }

    public execute(chip8: Chip8): void {
        const x = chip8.vRegisters[this.x].get();
        if (x === this.n) {
            chip8.pc += 2;
        }
    }
}
