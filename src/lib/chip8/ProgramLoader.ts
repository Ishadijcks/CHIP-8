import * as fs from 'node:fs';
import { InvalidFileSizeException } from '$lib/chip8/Exceptions';

export class ProgramLoader {
    public readFile(path: string): number[] {
        const file = fs.readFileSync(path);
        console.log(file);

        if (file.length % 2 !== 0) {
            throw new InvalidFileSizeException();
        }
        const res = [];
        for (let i = 0; i < file.length; i++) {
            res.push(file[i]);
        }

        return res;
    }
}
