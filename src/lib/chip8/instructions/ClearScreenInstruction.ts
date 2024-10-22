import { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import type { Chip8 } from '../Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export class ClearScreenInstruction extends BaseInstruction {
    public name: string = 'ClearScreenInstruction';

    public static matches(data: InstructionData): boolean {
        return data.value === 0x00e0;
    }

    public getDescription(): string {
        return 'Clear the screen';
    }

    public execute(chip8: Chip8): void {
        chip8.display.clearScreen();
    }
}
