import type { Chip8 } from '$lib/chip8/Chip8';
import type { InstructionData } from '$lib/chip8/InstructionData';

export abstract class BaseInstruction {
    public abstract name: string;

    public value: number;
    public hex: string;

    public first: number;
    public second: number;
    public third: number;
    public fourth: number;

    protected x: number = -1;
    protected y: number = -1;
    protected n: number = -1;

    public constructor(data: InstructionData) {
        this.value = data.value;
        this.hex = data.hex;

        this.first = data.first;
        this.second = data.second;
        this.third = data.third;
        this.fourth = data.fourth;
    }

    public abstract getDescription(): string;

    public abstract execute(chip8: Chip8): void;

    public static matches(data: InstructionData): boolean {
        throw new Error(`Match not implemented ${data}}`);
    }

    protected parseXNN(): void {
        this.x = this.second;
        this.n = this._parseNN();
    }

    protected parseXYN(): void {
        this.x = this.second;
        this.y = this.third;
        this.n = this.fourth;
    }

    protected parseNNN(): void {
        this.n = this._parseNNN();
    }

    private _parseNNN(): number {
        return this.second * 256 + this.third * 16 + this.fourth;
    }

    private _parseNN(): number {
        return 16 * this.third + this.fourth;
    }
}
