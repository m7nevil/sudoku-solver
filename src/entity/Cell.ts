import _ from "lodash";
import {Const} from "../common/Const";

export class Cell {
    public markValues: number[] = Const.FULL;

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

    public deleteMarks(marks: number[]) {
        this.markValues = _.difference(this.markValues, marks);
    }

    public emptyMarks() {
        this.markValues = [];
    }

    public setValue(value: number) {
        this.value = value;
        this.emptyMarks();
    }

    public toString() {
        return this.value;
    }

    public printPosition() {
        return `(${this.col}, ${this.row})`
    }
}