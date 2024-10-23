export class Register {
    public readonly name: string;
    public readonly SIZE;
    _value: number = 0;

    constructor(name: string, size: number = 256) {
        this.name = name;
        this.SIZE = size;
    }

    public get(): number {
        return this._value;
    }

    public set(value: number): void {
        this._value = value;
    }

    /**
     * Returns true if overflown
     * @param increment
     */
    public add(increment: number): boolean {
        this._value += increment;
        if (this._value > this.SIZE - 1) {
            this._value = this._value % this.SIZE;
            return true;
        }
        return false;
    }
}
