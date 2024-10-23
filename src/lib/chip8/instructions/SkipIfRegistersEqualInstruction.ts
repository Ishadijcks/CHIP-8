import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import type { Chip8 } from '../Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export class SkipIfRegistersEqualInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXYN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0x5;
    }

    public getDescription(): string {
        return `Skip if V${this.x.toString(16)} == V${this.y.toString(16)}`;
    }

    public execute(chip8: Chip8): void {
        const x = chip8.vRegisters[this.x].get();
        const y = chip8.vRegisters[this.y].get();
        if (x === y) {
            chip8.pc += 2;
        }
    }
}
