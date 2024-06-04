import {Cell} from "./Cell";
import _ from "lodash";
import {ArrayUtils} from "../common/ArrayUtils";

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
        const emptyCells = this.cells
            .filter(cell => cell.value === 0)
            .sort((a, b) => b.markValues.length - a.markValues.length);

        for (let i = 0; i < emptyCells.length; i++) {
            const cell = emptyCells[i];
            const cellGroup = [cell];
            for (let j = i + 1; j < emptyCells.length; j++) {
                const cell2 = emptyCells[j];
                if (ArrayUtils.contains(cell.markValues, cell2.markValues)) {
                    cellGroup.push(cell2);
                    if (cellGroup.length >= cell.markValues.length) {
                        const otherCells = _.difference(emptyCells, cellGroup);
                        if (otherCells.length > 0) {
                            otherCells.forEach(c => c.deleteMarks(cell.markValues));
                        }
                    }
                }
            }
        }

        const valuedCells = this.cells.filter(cell => cell.value > 0);
        emptyCells.forEach(cell => cell.deleteMarks(valuedCells.map(c => c.value)))
        const markValues = _.flatten(emptyCells.map(cell => cell.markValues));
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

    public done() {
        return this.cells.every(cell => cell.value > 0);
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