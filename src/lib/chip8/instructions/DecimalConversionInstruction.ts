import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import { type Chip8 } from '../Chip8';
import { type InstructionData } from '$lib/chip8/InstructionData';

export class DecimalConversionInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXNN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0xf && data.third === 0x3 && data.fourth === 0x3;
    }

    public getDescription(): string {
        return `[I..I+3] = dec(V${this.x.toString(16)})`;
    }

    public execute(chip8: Chip8): void {
        const x = chip8.vRegisters[this.x].get();
        const i = chip8.i.get();
        const xString = x.toString().padStart(3, '0');
        console.log(x, xString);
        chip8.memory.write(i + 0, +xString[0]);
        chip8.memory.write(i + 1, +xString[1]);
        chip8.memory.write(i + 2, +xString[2]);
    }
}
