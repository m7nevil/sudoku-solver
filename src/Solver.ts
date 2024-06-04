import {Matrix} from "./entity/Matrix";
import _ from "lodash";
import {Const} from "./common/Const";
import {CellList} from "./entity/CellList";

export class Solver {

    public constructor(
        protected matrix: Matrix
    ) {
    }

    public setMarkValues() {
        const matrix = this.matrix;
        let updated = false;
        console.log('-------------Set Mark Values------------')
        matrix.rows.forEach((rowList, row) => {
            rowList.cells.forEach((cell, col) => {
                if (cell.value > 0) {
                    cell.emptyMarks();
                    return;
                }

                const rowValues = rowList.getValues();
                const colValues = matrix.cols[col].getValues();
                const chunkValues = matrix.getCellChunk(row, col).getValues();
                const values = _.uniq(rowValues.concat(colValues).concat(chunkValues));
                cell.marks = _.difference(cell.marks, values);

                if (cell.marks.length === 1) {
                    cell.setValue(cell.marks[0])
                    updated = true;
                }

                console.log(`(${col}, ${row})`, cell.marks, cell.value);
            })
        })

        if (updated) {
            console.log(this.matrix.toString())
            this.setMarkValues()
        }
    }

    public checkCellLists() {
        console.log('-------------checkCellLists------------')
        this.matrix.rows.forEach(list => list.checkMarks());
        this.matrix.cols.forEach(list => list.checkMarks());
        this.matrix.chunks.forEach(list => list.checkMarks());
    }

    public checkCrossCells() {
        console.log('-------------checkCrossCells------------');
        const matrix = this.matrix;
        matrix.rows.forEach((rowList, row) => {
            rowList.cells.forEach((cell, col) => {
                if (cell.value > 0) {
                    cell.emptyMarks();
                    return;
                }

                const chunkList = matrix.getCellChunk(row, col);
                this.checkCrossMarks(chunkList, rowList);
                this.checkCrossMarks(chunkList, matrix.cols[col])
            })
        })
    }

    public checkCrossMarks(chunkList: CellList, list: CellList) {
        const crossCells = _.intersection(list.emptyCells(), chunkList.emptyCells());
        const otherChunkCells = _.difference(chunkList.emptyCells(), crossCells);
        const otherListCells = _.difference(list.emptyCells(), crossCells);
        const crossMarks = _.uniq(crossCells.flatMap(cell => cell.marks));
        const otherChunkMarks = _.uniq(otherChunkCells.flatMap(cell => cell.marks));
        const crossOnlyMarks = _.difference(crossMarks, otherChunkMarks);
        if (crossOnlyMarks.length) {
            otherListCells.forEach(cell => cell.deleteMarks(crossOnlyMarks));
        }
    }

    public done() {
        return this.matrix.rows.every(list => list.done())
    }

}