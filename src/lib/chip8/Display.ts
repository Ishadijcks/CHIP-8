export class Display {
    readonly HEIGHT: number = 32;
    readonly WIDTH: number = 64;
    private _grid: boolean[][];

    get grid(): boolean[][] {
        return this._grid;
    }

    public constructor() {
        this._grid = [];
        for (let y = 0; y < this.HEIGHT; y++) {
            const row = [];
            for (let x = 0; x < this.WIDTH; x++) {
                row.push(false);
            }
            this._grid.push(row);
        }
    }

    public setPixel(x: number, y: number, value: boolean): void {
        if (x < 0 || x > this.WIDTH || y < 0 || y > this.HEIGHT) {
            console.log(`Invalid coordinate ${x}, ${y}`);
        }
        this._grid[y][x] = value;
    }

    public toggle(x: number, y: number): boolean {
        if (x < 0 || x > this.WIDTH || y < 0 || y > this.HEIGHT) {
            console.log(`Invalid coordinate ${x}, ${y}`);
        }
        this._grid[y][x] = !this._grid[y][x];
        return this._grid[y][x];
    }

    public clearScreen() {
        for (let y = 0; y < this.HEIGHT; y++) {
            for (let x = 0; x < this.WIDTH; x++) {
                this.setPixel(x, y, false);
            }
        }
    }

    public print(): void {
        for (let y = 0; y < this.HEIGHT; y++) {
            let row = '';
            for (let x = 0; x < this.WIDTH; x++) {
                row += this.grid[y][x] ? 'X' : '-';
            }
        }
    }
}
