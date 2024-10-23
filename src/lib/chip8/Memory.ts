import { InvalidFileSizeException, MemoryOutOfBoundsException } from '$lib/chip8/Exceptions';
import { InstructionData } from '$lib/chip8/InstructionData';

export class Memory {
    readonly SIZE: number = 4 * 1024;
    public _storage: number[] = [];

    public readonly PROGRAM_OFFSET: number = 0x200;
    public readonly FONT_OFFSET: number = 0x50;

    // prettier-ignore
    readonly FONT_DATA = [
        0xF0, 0x90, 0x90, 0x90, 0xF0, // 0
        0x20, 0x60, 0x20, 0x20, 0x70, // 1
        0xF0, 0x10, 0xF0, 0x80, 0xF0, // 2
        0xF0, 0x10, 0xF0, 0x10, 0xF0, // 3
        0x90, 0x90, 0xF0, 0x10, 0x10, // 4
        0xF0, 0x80, 0xF0, 0x10, 0xF0, // 5
        0xF0, 0x80, 0xF0, 0x90, 0xF0, // 6
        0xF0, 0x10, 0x20, 0x40, 0x40, // 7
        0xF0, 0x90, 0xF0, 0x90, 0xF0, // 8
        0xF0, 0x90, 0xF0, 0x10, 0xF0, // 9
        0xF0, 0x90, 0xF0, 0x90, 0x90, // A
        0xE0, 0x90, 0xE0, 0x90, 0xE0, // B
        0xF0, 0x80, 0x80, 0x80, 0xF0, // C
        0xE0, 0x90, 0x90, 0x90, 0xE0, // D
        0xF0, 0x80, 0xF0, 0x80, 0xF0, // E
        0xF0, 0x80, 0xF0, 0x80, 0x80, // F
    ];

    constructor() {
        for (let i = 0; i < this.SIZE; i++) {
            this._storage.push(0);
        }

        this.loadFont();
    }

    public clear() {
        for (let i = 0; i < this.SIZE; i++) {
            this._storage[i] = 0;
        }
        this.loadFont();
    }

    public loadProgram(program: number[]) {
        // TODO(@Isha): Reset entire memory?
        for (let i = 0; i < program.length; i++) {
            this._storage[this.PROGRAM_OFFSET + i] = program[i];
        }
    }

    public getInstruction(programCounter: number): InstructionData {
        if (programCounter % 2 !== 0) {
            throw new InvalidFileSizeException(`The program counter is not a multiple of 2 ${programCounter}`);
        }
        return new InstructionData(this.read(programCounter), this.read(programCounter + 1));
    }

    public getContext(programCounter: number, contextSize: number = 10): InstructionData[] {
        const res: InstructionData[] = [];
        const start = Math.max(0, programCounter - 2 * contextSize);
        const end = Math.min(this.SIZE, programCounter + 2 * contextSize);
        for (let i = start; i < end; i += 2) {
            res.push(this.getInstruction(i));
        }
        return res;
    }

    public read(offset: number): number {
        if (offset < 0 || offset > this.SIZE) {
            throw new MemoryOutOfBoundsException(`Could not read from memory offset: ${offset}`);
        }
        return this._storage[offset];
    }

    public write(offset: number, value: number): void {
        if (offset < 0 || offset > this.SIZE) {
            throw new MemoryOutOfBoundsException(`Could not write to memory offset: ${offset}`);
        }
        this._storage[offset] = value;
    }

    private loadFont(): void {
        for (let i = 0; i < this.FONT_DATA.length; i++) {
            this.write(this.FONT_OFFSET + i, this.FONT_DATA[i]);
        }
    }
}
