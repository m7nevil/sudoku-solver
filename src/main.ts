import {Matrix} from "./entity/Matrix";
import _, {difference} from "lodash";

const array2d  = [
    [0, 5, 0, 3, 0, 4, 0, 0, 1],
    [3, 0, 0, 0, 0, 8, 7, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 8, 0, 0, 9, 0, 0, 5, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0],
    [9, 0, 0, 0, 4, 3, 0, 0, 7],
    [7, 0, 4, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 6, 2],
    [0, 0, 0, 5, 0, 6, 0, 0, 0],
];

const FULL = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const matrix = Matrix.fromArray2D(array2d);


console.log(matrix.toString());
console.log('-----------------------------------------------------')
console.log(matrix.printChunks());
console.log('---------------------Game-Start----------------------')

matrix.rows.forEach((rowList, row) => {
    rowList.cells.forEach((cell, col) => {
        if (cell.value > 0) {
            cell.clearMarks();
            return;
        }

        const rowValues = rowList.getValues();
        const colValues = matrix.cols[col].getValues();
        const chunkValues = matrix.getCellChunk(row, col).getValues();
        const values = _.uniq(rowValues.concat(colValues).concat(chunkValues));
        cell.markValues = _.difference(FULL, values);

        console.log(`(${col}, ${row})`, cell.markValues);

        if (cell.markValues.length === 1) {
            cell.value = cell.markValues[0];
            cell.clearMarks();
        }
    })
})
console.log('-------------Mark Value Counts------------')
matrix.rows.forEach((list, row) => {
    list.checkMarks();
})



