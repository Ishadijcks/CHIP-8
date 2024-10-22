import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import { type Chip8 } from '../Chip8';
import { type InstructionData } from '$lib/chip8/InstructionData';

export class DrawInstruction extends BaseInstruction {
    public name: string = 'DrawInstruction';

    constructor(data: InstructionData) {
        super(data);
        this.parseXYN();
    }

    public static matches(data: InstructionData): boolean {
        return data.first === 0xd;
    }

    public getDescription(): string {
        return `Drawing X V${this.x.toString(16)}, Y V${this.y.toString(16)}, N ${this.n}`;
    }

    public execute(chip8: Chip8): void {
        const x = chip8.vRegisters[this.x].get() % chip8.display.WIDTH;
        const y = chip8.vRegisters[this.y].get() % chip8.display.HEIGHT;
        const I = chip8.i.get();

        // console.log(`Drawing something... x: ${x}, y: ${y}, I: ${I}, N: ${N}`);
        chip8.vF.set(0);
        for (let row = 0; row < this.n; row++) {
            const data = chip8.memory.read(I + row);
            const bits = data.toString(2).padStart(8, '0');
            console.log(data, bits);
            for (let bit = 0; bit < bits.length; bit++) {
                if (bits[bit] === '1') {
                    const result = chip8.display.toggle(x + bit, y + row);
                    if (result === true) {
                        chip8.vF.set(1);
                    }
                }
            }
        }
    }
}
