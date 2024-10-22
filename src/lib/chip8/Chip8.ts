import { Display } from '$lib/chip8/Display';
import { Memory } from '$lib/chip8/Memory';
import { Stack } from '$lib/chip8/Stack';
import { Register } from '$lib/chip8/Register';
import type { Instruction } from '$lib/chip8/Instruction';

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

    private execute(instruction: Instruction) {
        console.log('Instruction', instruction.hex + '\t\t');

        const first = instruction.first;
        const second = instruction.second;
        const third = instruction.third;
        const fourth = instruction.fourth;
        switch (first) {
            case 0x0:
                switch (third) {
                    case 0xe:
                        switch (fourth) {
                            case 0x0: {
                                // 00E0
                                console.log('Clear screen');
                                this.display.clearScreen();
                                return;
                            }
                            case 0xe: {
                                // 00EE
                                console.log('Call return');
                                this.pc = this.stack.pop();
                                return;
                            }
                        }
                }
                // 0NNN
                console.log('Ignore');
                return;
            case 0x1: {
                // 0NNN
                const address = this.getAddress3(second, third, fourth);
                console.log(`Jumping to ${address}`);
                this.pc = address;
                return;
            }
            case 0x6: {
                const value = this.getAddress2(third, fourth);
                console.log(`Setting V${instruction.secondHex} to ${value}`);
                this.vRegisters[second].set(value);
                return;
            }
            case 0x7: {
                const increment = this.getAddress2(third, fourth);
                console.log(`Adding ${increment} to V${instruction.secondHex}`);
                this.vRegisters[second].add(increment);
                return;
            }
            case 0xa: {
                const value = this.getAddress3(second, third, fourth);
                console.log(`Setting I to ${value}`);

                this.i.set(value);
                return;
            }
            case 0xd: {
                let x = this.vRegisters[second].get() % this.display.WIDTH;
                let y = this.vRegisters[third].get() % this.display.HEIGHT;
                const I = this.i.get();
                const N = fourth;
                console.log(`Drawing something... x: ${x}, y: ${y}, I: ${I}, N: ${N}`);

                this.vF.set(0);
                for (let row = 0; row < N; row++) {
                    const data = this.memory.read(I + row);
                    const bits = data.toString(2).padStart(8, '0');
                    console.log(data, bits);
                    for (let bit = 0; bit < bits.length; bit++) {
                        if (bits[bit] === '1') {
                            const result = this.display.toggle(x + bit, y + row);
                            if (result === true) {
                                this.vF.set(1);
                            }
                        }
                    }
                }

                return;
            }
        }
        console.warn('<------ Unhandled instruction', instruction.hex);
        this.display.print();
    }

    private getAddress2(n1: number, n2: number): number {
        return n1 * 16 + n2;
    }

    private getAddress3(n1: number, n2: number, n3: number): number {
        return n1 * 256 + n2 * 16 + n3;
    }

    private get vF(): Register {
        return this.vRegisters[0xf];
    }
}
