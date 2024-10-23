import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import { type Chip8 } from '../Chip8';
import { type InstructionData } from '$lib/chip8/InstructionData';

export class SetIndexToFontInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXNN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0xf && data.third === 0x2 && data.fourth === 0x9;
    }

    public getDescription(): string {
        return `I = char(V${this.x.toString(16)})`;
    }

    public execute(chip8: Chip8): void {
        const char = chip8.vRegisters[this.x].get();
        const target = chip8.memory.FONT_OFFSET + 5 * char;
        chip8.i.set(target);
    }
}
