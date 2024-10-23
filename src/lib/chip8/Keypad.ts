import { InvalidKeyException } from '$lib/chip8/Exceptions';

export class Keypad {
    readonly KEY_COUNT = 0x10;
    private _keys: boolean[] = [];

    get keys(): boolean[] {
        return this._keys;
    }

    constructor() {
        for (let i = 0; i < this.KEY_COUNT; i++) {
            this._keys.push(false);
        }
    }

    public press(key: number): void {
        if (key < 0 || key >= this.KEY_COUNT) {
            throw new InvalidKeyException(`Key ${key.toString(16)} does not exist`);
        }
        this._keys[key] = true;
    }

    public release(key: number): void {
        if (key < 0 || key >= this.KEY_COUNT) {
            throw new InvalidKeyException(`Key ${key.toString(16)} does not exist`);
        }
        this._keys[key] = false;
    }

    public isPressed(key: number): boolean {
        if (key < 0 || key >= this.KEY_COUNT) {
            throw new InvalidKeyException(`Key ${key.toString(16)} does not exist`);
        }
        return this._keys[key];
    }
}
