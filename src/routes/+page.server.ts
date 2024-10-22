import type { PageServerLoad } from './$types';
import { ProgramLoader } from '$lib/chip8/ProgramLoader';

export const prerender = true;
export const ssr = false;
import { resolve } from 'path';

export const load: PageServerLoad = async () => {
    const reader = new ProgramLoader();
    return reader.readFile(resolve('./src/lib/programs/IBM Logo.ch8'));
};
