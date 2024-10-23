import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import type { Chip8 } from '../Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export class GetDelayTimerInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXNN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0xf && data.third === 0x0 && data.fourth === 0x7;
    }

    public getDescription(): string {
        return `V${this.x.toString(16)} = DELAY`;
    }

    public execute(chip8: Chip8): void {
        const vx = chip8.vRegisters[this.x];
        vx.set(chip8.delayTimer.get());
    }
}
