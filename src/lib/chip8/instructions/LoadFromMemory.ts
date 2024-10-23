import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import { type Chip8 } from '../Chip8';
import { type InstructionData } from '$lib/chip8/InstructionData';

export class LoadFromMemory extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXNN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0xf && data.third === 0x6 && data.fourth === 0x5;
    }

    public getDescription(): string {
        return `V0..V${this.x.toString(16)} = MEM[I..I+${this.x.toString(16)}]`;
    }

    public execute(chip8: Chip8): void {
        const I = chip8.i.get();
        for (let i = 0; i <= this.x; i++) {
            chip8.vRegisters[i].set(chip8.memory.read(I + i));
        }
    }
}