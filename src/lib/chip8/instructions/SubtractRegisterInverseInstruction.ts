import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import type { Chip8 } from '../Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export class SubtractRegisterInverseInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXYN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0x8 && data.fourth == 0x7;
    }

    public getDescription(): string {
        const x = this.x.toString(16);
        const y = this.y.toString(16);
        return `V${x} = V${y} - V${x}`;
    }

    public execute(chip8: Chip8): void {
        const vy = chip8.vRegisters[this.y];
        const vx = chip8.vRegisters[this.x];

        const y = vy.get();
        const x = vx.get();
        vx.set((y - x + 256) % 256);

        chip8.vF.set(y > x ? 1 : 0);
    }
}
