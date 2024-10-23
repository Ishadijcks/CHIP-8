import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import type { Chip8 } from '../Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export class SkipIfKeyNotPressedInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXNN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0xe && data.third === 0xa && data.fourth === 0x1;
    }

    public getDescription(): string {
        return `Skip if Key V${this.x.toString(16)} pressed`;
    }

    public execute(chip8: Chip8): void {
        const x = chip8.vRegisters[this.x].get();
        if (!chip8.keypad.isPressed(x)) {
            chip8.pc += 2;
        }
    }
}
