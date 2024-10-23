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
import { AddInstruction } from '$lib/chip8/instructions/AddInstruction';
import { DrawInstruction } from '$lib/chip8/instructions/DrawInstruction';
import { CallSubroutineInstruction } from '$lib/chip8/instructions/CallSubroutineInstruction';
import { ReturnSubroutineInstruction } from '$lib/chip8/instructions/ReturnSubroutineInstruction';
import { SkipIfRegisterEqualToInstruction } from '$lib/chip8/instructions/SkipIfRegisterEqualToInstruction';
import { SkipIfRegisterNotEqualToInstruction } from '$lib/chip8/instructions/SkipIfRegisterNotEqualToInstruction';
import { SkipIfRegistersEqualInstruction } from '$lib/chip8/instructions/SkipIfRegistersEqualInstruction';
import { SkipIfRegistersNotEqualInstruction } from '$lib/chip8/instructions/SkipIfRegistersNotEqualInstruction';
import { SetRegisterToRegisterInstruction } from '$lib/chip8/instructions/SetRegisterToRegisterInstruction';
import { BinaryOrInstruction } from '$lib/chip8/instructions/BinaryOrInstruction';
import { BinaryAndInstruction } from '$lib/chip8/instructions/BinaryAndInstruction';
import { BinaryXorInstruction } from '$lib/chip8/instructions/BinaryXorInstruction';
import { AddRegisterInstruction } from '$lib/chip8/instructions/AddRegisterInstruction';
import { SubtractRegisterInstruction } from '$lib/chip8/instructions/SubtractRegisterInstruction';
import { SubtractRegisterInverseInstruction } from '$lib/chip8/instructions/SubtractRegisterInverseInstruction';
import { ShiftRegisterInstruction } from '$lib/chip8/instructions/ShiftRegisterInstruction';
import { JumpWithOffsetInstruction } from '$lib/chip8/instructions/JumpWithOffsetInstruction';
import { RandomInstruction } from '$lib/chip8/instructions/RandomInstruction';
import { Keypad } from '$lib/chip8/Keypad';
import { SkipIfKeyPressedInstruction } from '$lib/chip8/instructions/SkipIfKeyPressedInstruction';
import { SkipIfKeyNotPressedInstruction } from '$lib/chip8/instructions/SkipIfKeyNotPressedInstruction';
import { Timer } from '$lib/chip8/Timer';
import { GetDelayTimerInstruction } from '$lib/chip8/instructions/GetDelayTimerInstruction';
import { SetDelayTimerInstruction } from '$lib/chip8/instructions/SetDelayTimerInstruction';
import { AddToIndexInstruction } from '$lib/chip8/instructions/AddToIndexInstruction';
import { SetIndexToFontInstruction } from '$lib/chip8/instructions/SetIndexToFontInstruction';
import { GetKeyPressInstruction } from '$lib/chip8/instructions/GetKeyPressInstruction';
import { DecimalConversionInstruction } from '$lib/chip8/instructions/DecimalConversionInstruction';
import { WriteToMemory } from '$lib/chip8/instructions/WriteToMemory';
import { LoadFromMemory } from '$lib/chip8/instructions/LoadFromMemory';

export class Chip8 {
    public memory: Memory = new Memory();
    public display: Display = new Display();
    public pc: number = 0;
    public i: Register = new Register('I', 0x1000);
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
    public keypad: Keypad = new Keypad();
    // TODO(@Isha): Tick down each second
    public delayTimer = new Timer('DELAY');
    public soundTimer = new Timer('SOUND');

    /**
     * Instructions are matched greedily, sort them by increasing broadness
     */
    // prettier-ignore
    public supportedInstructions: typeof BaseInstruction[] = [
        ReturnSubroutineInstruction,            // 00EE
        ClearScreenInstruction,                 // 00E0
        JumpInstruction,                        // 1NNN
        CallSubroutineInstruction,              // 2NNN
        SkipIfRegisterEqualToInstruction,       // 3XNN
        SkipIfRegisterNotEqualToInstruction,    // 4XNN
        SkipIfRegistersEqualInstruction,        // 5XY0
        SetRegisterInstruction,                 // 6XNN
        AddInstruction,                         // 7XNN
        SetRegisterToRegisterInstruction,       // 8XY0
        BinaryOrInstruction,                    // 8XY1
        BinaryAndInstruction,                   // 8XY2
        BinaryXorInstruction,                   // 8XY3
        AddRegisterInstruction,                 // 8XY4
        SubtractRegisterInstruction,            // 8XY5
        SubtractRegisterInverseInstruction,     // 8XY7
        ShiftRegisterInstruction,               // 8XY6, 8XYE
        SkipIfRegistersNotEqualInstruction,     // 9XY0
        SetIndexInstruction,                    // ANNN
        JumpWithOffsetInstruction,              // BNNN
        RandomInstruction,                      // CNNN
        DrawInstruction,                        // DXYN
        SkipIfKeyPressedInstruction,            // EX9E
        SkipIfKeyNotPressedInstruction,         // EXA1
        GetDelayTimerInstruction,               // FX07
        SetDelayTimerInstruction,               // FX15
        AddToIndexInstruction,                  // FX1E
        GetKeyPressInstruction,                 // FX0A <-- TODO
        SetIndexToFontInstruction,              // FX29
        DecimalConversionInstruction,           // FX33
        WriteToMemory,                          // FX55
        LoadFromMemory,                         // FX65
    ];

    public start(program: number[]): void {
        this.pc = this.memory.PROGRAM_OFFSET;
        this.memory.clear();
        this.memory.loadProgram(program);
        this.display.clearScreen();
    }

    public step(): void {
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
