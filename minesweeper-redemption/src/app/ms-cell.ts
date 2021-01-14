import { Point } from './ms-board';

export class MSCell {
  public hasMine = false;
  public adjacentMines = 0;
  public revealed = false;

  constructor(public location: Point) {}
}
