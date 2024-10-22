export class InstructionData {
    public value: number;
    public hex: string;

    public first: number;
    public second: number;
    public third: number;
    public fourth: number;

    constructor(firstByte: number, secondByte: number) {
        this.value = firstByte * 256 + secondByte;
        this.hex = this.value.toString(16).padStart(4, '0');

        this.first = (firstByte & 0xf0) >> 4;
        this.second = firstByte & 0xf;
        this.third = (secondByte & 0xf0) >> 4;
        this.fourth = secondByte & 0xf;
    }
}
