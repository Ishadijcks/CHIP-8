import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import type { Chip8 } from '../Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export class GetKeyPressInstruction extends BaseInstruction {
    constructor(data: InstructionData) {
        super(data);
        this.parseXNN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0xf && data.third === 0x0 && data.fourth === 0xa;
    }

    public getDescription(): string {
        return `V${this.x.toString(16)} = KeyPress`;
    }

    public execute(chip8: Chip8): void {
        const vx = chip8.vRegisters[this.x];
        const x = vx.get();
        // TODO(@Isha): Figure out how we can "wait" for key input, or grab the latest
        throw Error('Not yet implemented');
        if (!chip8.keypad.isPressed(x)) {
            chip8.pc -= 2;
            return;
        }
    }
}
