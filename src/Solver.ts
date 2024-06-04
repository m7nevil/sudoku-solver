import {Matrix} from "./entity/Matrix";
import _ from "lodash";
import {Const} from "./common/Const";

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
                cell.markValues = _.difference(cell.markValues, values);

                if (cell.markValues.length === 1) {
                    cell.setValue(cell.markValues[0])
                    updated = true;
                }

                console.log(`(${col}, ${row})`, cell.markValues, cell.value);
            })
        })

        if (updated) {
            console.log(this.matrix.toString())
            this.setMarkValues()
        }
    }

    public checkCellLists() {
        console.log('-------------checkCellLists------------')
        this.matrix.rows.forEach(list => list.checkMarks())
        this.matrix.cols.forEach(list => list.checkMarks());
        this.matrix.chunks.forEach(list => list.checkMarks());
    }

}