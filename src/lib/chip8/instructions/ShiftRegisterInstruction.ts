import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import type { Chip8 } from '../Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export class ShiftRegisterInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXYN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0x8 && (data.fourth == 0x6 || data.fourth == 0xe);
    }

    public getDescription(): string {
        const x = this.x.toString(16);
        // const y = this.y.toString(16);
        const direction = this.fourth === 0x6 ? 'right' : 'left';
        return `Shift V${x} ${direction}`;
    }

    public execute(chip8: Chip8): void {
        const vx = chip8.vRegisters[this.x];
        // const vy = chip8.vRegisters[this.y];

        // TODO(@Isha): Solve ambiguity

        const x = vx.get();

        if (this.fourth === 0x6) {
            // Shift Right
            chip8.vF.set(x & 1);
            vx.set(((x >> 1) + 256) % 256);
        } else {
            // Shift Left
            chip8.vF.set((x & (1 << 7)) !== 0 ? 1 : 0);
            vx.set(((x << 1) + 256) % 256);
        }
    }
}
