import type { PageServerLoad } from './$types';
import { ProgramLoader } from '$lib/chip8/ProgramLoader';

export const prerender = true;
export const ssr = false;
import { resolve } from 'path';

export const load: PageServerLoad = async () => {
    const reader = new ProgramLoader();

    // TODO(@Isha): Read all files from folder
    return {
        programs: {
            'IBM Logo - IBM, I guess?': reader.readFile(resolve('./src/lib/programs/IBM Logo.ch8')),
            'Test Opcode - corax89': reader.readFile(resolve('./src/lib/programs/test_opcode.ch8')),
            'BC Test - BonCoder': reader.readFile(resolve('./src/lib/programs/bc_test.ch8')),
            'Octojam 2 - JohnEarnest': reader.readFile(resolve('./src/lib/programs/octojam2title.ch8')),
            'Slippery Slope - JohnEarnest': reader.readFile(resolve('./src/lib/programs/slipperyslope.ch8')),
        },
    };
};
