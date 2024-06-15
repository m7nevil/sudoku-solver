import {Cell} from "./Cell";
import {CellList} from "./CellList";
import _ from "lodash";

export class Matrix {
    public array2d: number[][] = [[]];
    private rowCount: number = -1;
    private colCount: number = -1;

    public rows: CellList[] = [];
    public cols: CellList[] = [];
    public chunks: CellList[] = [];

    private chunkMap: {[key: string]: CellList} = {}

    public static fromArray2D(array2d: number[][]) {
        const self = new Matrix();
        self.array2d = array2d;
        self.rowCount = self.array2d.length;
        self.colCount = self.array2d[0].length;

        self.rows = array2d.map((array, row) => CellList.fromNumbers(array, row))
        self.initCols();
        self.initChunks();

        return self;
    }

    private initCols() {
        for (let i = 0; i < this.colCount; i ++) {
            const colCells = this.rows.map(row => row.cells[i]);
            this.cols.push(CellList.fromCells(colCells));
        }
    }

    private initChunks() {
        for (let i = 0; i < this.rowCount; i ++) {
            const rowIndex = Math.floor(i / 3);
            const cellList = this.rows[i];
            for (let j = 0; j < this.colCount; j ++) {
                const chunkIndex = rowIndex * 3 + Math.floor(j / 3);
                if (!this.chunks[chunkIndex]) {
                    this.chunks[chunkIndex] = new CellList();
                }
                const cell: Cell = cellList.cells[j];
                this.chunks[chunkIndex].addCell(cell);
            }
        }

        for (let i = 0; i < this.rowCount; i++) {
            const rowIndex = Math.floor(i / 3);
            const cellList = this.rows[i];
            for (let j = 0; j < this.colCount; j++) {
                const chunkIndex = rowIndex * 3 + Math.floor(j / 3);
                this.chunkMap[this.chunkKey(i, j)] = this.chunks[chunkIndex];
                console.log(this.chunkKey(i, j), this.chunks[chunkIndex].getValues())
            }
        }

        console.log("Initial chunks:\n", this.chunks.map(chunk => chunk.toString()).join('\n'))
    }

    public checkCrossMarks() {

    }

    private chunkKey(row: number, col: number) {
        return `${row}-${col}`;
    }

    public getCellChunk(row: number, col: number): CellList {
        return this.chunkMap[this.chunkKey(row, col)];
    }

    public count() {
        return _.sumBy(this.rows, list => list.count())
    }

    public toArray2D() {
        return this.array2d;
    }

    public toString() {
        return this.rows.map(row => row.toString()).join('\n');
    }

    public printChunks() {
        return this.chunks.map(chunk => chunk.toString()).join('\n');
    }

    public printPosition() {
        return this.rows.map(row => row.printPosition()).join('\n');
    }
}