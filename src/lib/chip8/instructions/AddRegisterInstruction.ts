import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import type { Chip8 } from '../Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export class AddRegisterInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXYN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0x8 && data.fourth == 0x4;
    }

    public getDescription(): string {
        const x = this.x.toString(16);
        const y = this.y.toString(16);
        return `V${x} = V${x} + V${y}`;
    }

    public execute(chip8: Chip8): void {
        const vx = chip8.vRegisters[this.x];
        const vy = chip8.vRegisters[this.y];

        const overflown = vx.add(vy.get());
        chip8.vF.set(overflown ? 1 : 0);
    }
}
