import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import type { Chip8 } from '../Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export class SetRegisterToRegisterInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXYN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0x8 && data.fourth == 0x0;
    }

    public getDescription(): string {
        return `V${this.x.toString(16)} = V${this.y.toString(16)}`;
    }

    public execute(chip8: Chip8): void {
        const vx = chip8.vRegisters[this.x];
        const vy = chip8.vRegisters[this.y];
        vx.set(vy.get());
    }
}
