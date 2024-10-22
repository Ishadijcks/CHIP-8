export class Instruction {
    public value: number;
    public hex: string;

    public first: number;
    public second: number;
    public third: number;
    public fourth: number;

    public firstHex: string;
    public secondHex: string;
    public thirdHex: string;
    public fourthHex: string;

    constructor(firstByte: number, secondByte: number) {
        this.value = firstByte * 256 + secondByte;
        this.hex = this.asHex();

        this.first = (firstByte & 0xf0) >> 4;
        this.second = firstByte & 0xf;
        this.third = (secondByte & 0xf0) >> 4;
        this.fourth = secondByte & 0xf;

        this.firstHex = this.hex[0];
        this.secondHex = this.hex[1];
        this.thirdHex = this.hex[2];
        this.fourthHex = this.hex[3];
    }

    public asHex(): string {
        return this.value.toString(16).padStart(4, '0').toUpperCase();
    }
}
