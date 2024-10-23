import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import { type Chip8 } from '../Chip8';
import { type InstructionData } from '$lib/chip8/InstructionData';

export class RandomInstruction extends BaseInstruction {
    private _random: number;
    constructor(data: InstructionData) {
        super(data);
        this.parseXNN();
        this._random = Math.floor(Math.random() * 256);
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0xc;
    }

    public getDescription(): string {
        return `V${this.x.toString(16)} = ${this.n} & Random (${this._random})`;
    }

    public execute(chip8: Chip8): void {
        chip8.vRegisters[this.x].set(this.n & this._random);
    }
}
