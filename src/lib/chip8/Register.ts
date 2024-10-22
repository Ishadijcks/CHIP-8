export class Register {
    public readonly name: string;
    _value: number = 0;

    constructor(name: string) {
        this.name = name;
    }

    public get(): number {
        return this._value;
    }

    public set(value: number): void {
        this._value = value;
    }

    public add(increment: number): void {
        this._value += increment;
    }
}
