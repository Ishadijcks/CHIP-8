import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import type { Chip8 } from '../Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export class BinaryOrInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXYN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0x8 && data.fourth == 0x1;
    }

    public getDescription(): string {
        const x = this.x.toString(16);
        const y = this.y.toString(16);
        return `V${x} = VX | V${y}`;
    }

    public execute(chip8: Chip8): void {
        const vx = chip8.vRegisters[this.x];
        const vy = chip8.vRegisters[this.y];
        vx.set(vx.get() | vy.get());
    }
}
