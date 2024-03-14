import Array2D from './array2d.js';

const getRandomNumber = (max) => Math.floor(Math.random() * (max + 1));

class GameOfLife {
  constructor(rowNum, columnNum) {
    this.rowNum = rowNum;
    this.columnNum = columnNum;
    this.field = new Array2D(rowNum, columnNum);
    this.setRandomField();
  }

  isAliveCell(i, j) {
    return !!this.field.get(i, j);
  }

  setRandomField() {
    this.field = this.field.map(() => !!getRandomNumber(1));
  }

  setCleanField() {
    this.field.fill(false);
  }

  addFigureAt(fig, i, j) {
    if (fig === true) {
      this.field.set(true, i, j);
    }
    this.field.overlay(fig, i, j);
  }

  getAliveNeighboursCount(argI, argJ) {
    let [i, j] = [argI, argJ];
    if (argJ === undefined) {
      [i, j] = this.field.posFromOffset(argI);
    }

    const cells = [
      [i - 1, j - 1],
      [i - 1, j],
      [i - 1, j + 1],
      [i, j + 1],
      [i, j - 1],
      [i + 1, j - 1],
      [i + 1, j],
      [i + 1, j + 1],
    ];

    const aliveCellsCount = cells.reduce((acc, [i, j]) => {
      if (this.isAliveCell(i, j)) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return aliveCellsCount;
  }

  advance() {
    const neighboursCountToStayAlive = 2;
    const neighboursCountToStayAliveAlt = 3;
    const neighboursCountToBecomeAlive = 3;
    this.field = this.field.map((isAlive, offset) => {
      const aliveNeighboursCount = this.getAliveNeighboursCount(offset);
      if (isAlive === true) {
        if (aliveNeighboursCount === neighboursCountToStayAlive
          || aliveNeighboursCount === neighboursCountToStayAliveAlt) {
          return true;
        }
      } else if (aliveNeighboursCount === neighboursCountToBecomeAlive) {
        return true;
      }
      return false;
    });
  }

  toString() {
    return this.field.map((value, index) => {
      const strValue = (value) ? 'x' : '~';
      if (index % this.columnNum === 0 && index !== 0) {
        return `\n${strValue}`;
      }
      return `${strValue}`;
    }).array.join(' ');
  }
}

export default GameOfLife;
