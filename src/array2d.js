class Array2D {
  constructor(rowNum, columnNum) {
    this.rowNum = rowNum;
    this.columnNum = columnNum;
    this.array = Array.apply(null, { length: rowNum * columnNum });
  }

  static fromObject({ rowNum, columnNum, array }) {
    const arr2d = new Array2D(rowNum, columnNum);
    if (rowNum * columnNum === array.length) {
      arr2d.array = [...array];
    }
    return arr2d;
  }

  posFromOffset(offset) {
    const i = Math.floor(offset / this.columnNum);
    const j = offset % this.columnNum;
    return [i, j];
  }

  offsetFromPos(i, j) {
    return (i * this.columnNum) + j;
  }

  inBounds(i, j) {
    if (j === undefined) {
      return (i >= 0 && i < this.rowNum * this.columnNum);
    }
    return ((i >= 0 && i < this.rowNum) && (j >= 0 && j < this.columnNum));
  }

  get(i, j) {
    if (this.inBounds(i, j)) {
      if (j === undefined) {
        return this.array[i];
      }
      return this.array[this.offsetFromPos(i, j)];
    }
    return null;
  }

  set(value, i, j) {
    if (this.inBounds(i, j)) {
      if (j === undefined) {
        this.array[i] = value;
      } else {
        this.array[this.offsetFromPos(i, j)] = value;
      }
    }
  }

  overlay(arr2d, i, j) {
    if (this.inBounds(i + arr2d.rowNum, j + arr2d.columnNum)) {
      arr2d.array.forEach((value, offset) => {
        const [arr2dI, arr2dJ] = arr2d.posFromOffset(offset);
        this.set(value, i + arr2dI, j + arr2dJ);
      });
    }
  }

  fill(value) {
    this.array.fill(value);
  }

  map(cb) {
    return this.constructor.fromObject({
      rowNum: this.rowNum,
      columnNum: this.columnNum,
      array: this.array.map(cb),
    });
  }

  getAllPos() {
    return this.array.map((value, offset) => this.posFromOffset(offset));
  }

  toString() {
    return this.array.map((value, index) => {
      if (index % this.columnNum === 0 && index !== 0) {
        return `\n${value}`;
      }
      return `${value}`;
    }).join(' ');
  }
}

export default Array2D;
