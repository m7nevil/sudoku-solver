import {Cell} from "./Cell";
import _ from "lodash";

export class CellList {

    public cells: Cell[] = []
    private array: number[] = [];

    public static fromNumbers(
        numbers: number[],
        row: number,
    ) {
        const list = new CellList();
        list.array = numbers;
        list.cells = numbers.map((num, col) => new Cell(num, row, col))
        return list;
    }

    public static fromCells(cells: Cell[]) {
        const list = new CellList();
        list.cells = cells;
        return list;
    }

    public getValues() {
        return this.cells.map(cell => cell.value).filter(v => v > 0);
    }

    public addCell(cell: Cell) {
        this.cells.push(cell);
        return this;
    }

    public checkMarks() {
        // const emptyCells = this.cells.filter(cell => cell.value === 0);
        // const longestCell = _.maxBy(emptyCells, cell => cell.markValues.length)
        // for (let i = longestCell.markValues.length-1; i >= 1 ; i --) {
        //
        // }

        const markValues = _.flatten(this.cells.map(cell => cell.markValues));
        const counts = _.countBy(markValues);
        let updated = false;
        for (let key in counts) {
            const count = counts[key];
            if (count === 1) {
                const value = parseInt(key);
                const cell = this.cells.find(cell => cell.markValues.indexOf(value) >= 0)
                cell.setValue(value);
                updated = true;
            }
        }

        if (updated) {
            this.checkMarks();
        }
    }


    public toArray() {
        return this.array;
    }

    public toString() {
        return this.cells.map(cell => cell.value).join(', ');
    }

    public printPosition() {
        return this.cells.map(cell => cell.printPosition()). join(',')
    }
}