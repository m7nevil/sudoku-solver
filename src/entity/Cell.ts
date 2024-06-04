
export class Cell {
    public markValues: number[] = [];

    public constructor(
        public value: number = 0,
        public row: number = -1,
        public col: number = -1,
    ) {
    }

    public setRow(row: number) {
        this.row = row;
        return this;
    }

    public setCol(col: number) {
        this.col = col;
        return this;
    }

    public clearMarks() {
        this.markValues = [];
    }

    public toString() {
        return this.value;
    }

    public printPosition() {
        return `(${this.col}, ${this.row})`
    }
}