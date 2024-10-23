import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import type { Chip8 } from '../Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export class SetSoundTimerInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXNN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0xf && data.third === 0x1 && data.fourth === 0x8;
    }

    public getDescription(): string {
        return `SOUND = V${this.x.toString(16)}`;
    }

    public execute(chip8: Chip8): void {
        const vx = chip8.vRegisters[this.x];
        chip8.delayTimer.set(vx.get());
    }
}
