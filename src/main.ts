import {Matrix} from "./entity/Matrix";
import {Solver} from "./Solver";

const array2d = [
    [0, 0, 0, 9, 0, 1, 6, 0, 0],
    [5, 0, 8, 0, 0, 0, 0, 0, 0],
    [0, 0, 7, 6, 0, 0, 0, 5, 0],
    [0, 0, 0, 0, 0, 4, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 8, 0, 1],
    [9, 0, 6, 0, 0, 0, 0, 0, 0],
    [0, 0, 5, 0, 0, 0, 4, 0, 0],
    [0, 0, 0, 7, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 9, 1, 6, 2],
];

// const array2d = [
//     [0, 9, 0, 0, 5, 0, 8, 0, 0],
//     [8, 0, 3, 0, 6, 0, 0, 0, 2],
//     [0, 4, 0, 3, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 5, 0, 0, 4],
//     [6, 0, 8, 7, 0, 0, 5, 0, 0],
//     [9, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 3, 0, 0, 0, 0, 0, 0, 0],
//     [5, 0, 7, 6, 0, 0, 4, 0, 0],
//     [0, 0, 0, 0, 2, 0, 0, 1, 0]
// ]

// const array2d = [
//     [1, 3, 0, 0, 0, 5, 0, 0, 0],
//     [5, 0, 0, 7, 0, 0, 0, 0, 2],
//     [0, 0, 0, 2, 0, 9, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [9, 1, 0, 0, 0, 0, 0, 8, 7],
//     [0, 0, 7, 0, 6, 0, 0, 1, 0],
//     [0, 5, 0, 4, 0, 0, 0, 0, 0],
//     [3, 4, 0, 0, 0, 0, 0, 0, 0],
//     [8, 0, 0, 0, 0, 6, 3, 0, 5],
// ];


const matrix = Matrix.fromArray2D(array2d);
const solver = new Solver(matrix);
let lastValueCount = matrix.count();
console.log(matrix.toString());
console.log('---------------------Game-Start----------------------')

while (!solver.done()) {
    solver.setMarkValues();
    console.log(matrix.toString());
    solver.checkCellLists();
    console.log(matrix.toString());
    if (lastValueCount === matrix.count()) {
        solver.checkCrossCells();
    }
    lastValueCount = matrix.count();
}



