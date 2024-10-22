import { Display } from '$lib/chip8/Display';
import { Memory } from '$lib/chip8/Memory';
import { Stack } from '$lib/chip8/Stack';
import { Register } from '$lib/chip8/Register';
import type { InstructionData } from '$lib/chip8/InstructionData';
import type { BaseInstruction } from '$lib/chip8/instructions/BaseInstruction';
import { ClearScreenInstruction } from '$lib/chip8/instructions/ClearScreenInstruction';
import { JumpInstruction } from '$lib/chip8/instructions/JumpInstruction';
import { SetIndexInstruction } from '$lib/chip8/instructions/SetIndexInstruction';
import { SetRegisterInstruction } from '$lib/chip8/instructions/SetRegisterInstruction';
import { AddRegisterInstruction } from '$lib/chip8/instructions/AddRegisterInstruction';
import { DrawInstruction } from '$lib/chip8/instructions/DrawInstruction';

export class Chip8 {
    public memory: Memory = new Memory();
    public display: Display = new Display();
    public pc: number = 0;
    public i: Register = new Register('I');
    public vRegisters: Register[] = [
        new Register('V0'),
        new Register('V1'),
        new Register('V2'),
        new Register('V3'),
        new Register('V4'),
        new Register('V5'),
        new Register('V6'),
        new Register('V7'),
        new Register('V8'),
        new Register('V9'),
        new Register('VA'),
        new Register('VB'),
        new Register('VC'),
        new Register('VD'),
        new Register('VE'),
        new Register('VF'),
    ];
    public stack: Stack = new Stack();
    // Delay timer
    // Sound timer
    // Variable registers

    /**
     * Instructions are matched greedily, sort them by increasing broadness
     */
    // prettier-ignore
    public supportedInstructions: typeof BaseInstruction[] = [
        ClearScreenInstruction,     // 0x00E0
        JumpInstruction,            // 0x1NNN
        SetRegisterInstruction,     // 0x6XNN
        AddRegisterInstruction,     // 0x7XNN
        DrawInstruction,            // 0xDXYN
        SetIndexInstruction,        // 0xANNN

    ];

    public start(program: Buffer): void {
        this.pc = this.memory.PROGRAM_OFFSET;
        this.memory.loadProgram(program);
    }

    public step(): void {
        console.log('\nstep', this.pc);
        const instruction = this.memory.getInstruction(this.pc);

        this.pc += 2;

        this.execute(instruction);
    }

    public decode(instructionData: InstructionData): BaseInstruction | undefined {
        const instruction = this.supportedInstructions.find((instruction) => instruction.matches(instructionData));

        if (!instruction) {
            return instruction;
        }
        return new instruction(instructionData);
    }

    private execute(instructionData: InstructionData) {
        const instruction = this.decode(instructionData);
        if (!instruction) {
            console.warn('<------ Unhandled instruction', instructionData.hex);
            return;
        }
        instruction.execute(this);
    }

    private getAddress2(n1: number, n2: number): number {
        return n1 * 16 + n2;
    }

    private getAddress3(n1: number, n2: number, n3: number): number {
        return n1 * 256 + n2 * 16 + n3;
    }

    public get vF(): Register {
        return this.vRegisters[0xf];
    }
}
