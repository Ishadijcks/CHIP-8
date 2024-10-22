import type { PageServerLoad } from './$types';
import { ProgramLoader } from '$lib/chip8/ProgramLoader';

export const prerender = true;
export const ssr = false;

export const load: PageServerLoad = async () => {
    const reader = new ProgramLoader();
    return reader.readFile('/Users/isha/Documents/chip8/src/lib/programs/IBM Logo.ch8');
};
