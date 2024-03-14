import GameOfLife from './game.js';
import Array2D from './array2d.js';

const game = new GameOfLife(16, 32);
const boxFigure = Array2D.fromObject({
  rowNum: 5,
  columnNum: 5,
  array: [
    0, 0, 0, 0, 0,
    0, 0, 1, 0, 0,
    0, 1, 0, 1, 0,
    0, 0, 1, 0, 0,
    0, 0, 0, 0, 0,
  ],
});

game.setCleanField();
game.setRandomField();
game.addFigureAt(boxFigure, 5, 5);
game.addFigureAt(boxFigure, 0, 0);
game.addFigureAt(boxFigure, 3, 3);
setInterval(() => {
  console.clear();
  console.log(`${game}`);
  game.advance();
}, 1000);
