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
            'IBM Logo': reader.readFile(resolve('./src/lib/programs/IBM Logo.ch8')),
            'Test Opcode': reader.readFile(resolve('./src/lib/programs/test_opcode.ch8')),
            'BC Test': reader.readFile(resolve('./src/lib/programs/bc_test.ch8')),
            'Octojam 2': reader.readFile(resolve('./src/lib/programs/octojam2title.ch8')),
        },
    };
};
