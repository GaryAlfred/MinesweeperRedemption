import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from "@angular/core";
import { MSBoard, Point, TriggerResult } from "../ms-board";
import { MSCell } from "../ms-cell";

@Component({
  selector: "minesweeper-board",
  templateUrl: "./minesweeper-board.component.html",
  styleUrls: ["./minesweeper-board.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class MinesweeperBoardComponent implements OnInit {
  @Input() public board: MSBoard;
  @Output() public youWin: EventEmitter<boolean> = new EventEmitter();
  @Output() public gameOverMan: EventEmitter<boolean> = new EventEmitter();

  public emptyCell: MSCell = new MSCell({ r: -1, c: -1 });

  constructor() {
    this.board = new MSBoard(1, 1);
    this.board.initialize();
  }

  ngOnInit(): void {}

  public checkCell = (point: Point) => {
    const cell = this.board.grid.get(point);
    cell.revealed = true;
    if (cell.hasMine) {
      setTimeout(() => this.gameOverMan.emit(true), 2);
      return;
    }
    this.revealSafeAdjacents(point);
    const isComplete = this.board.checkForComplete();
    if (isComplete) {
      setTimeout(() => this.youWin.emit(true), 2);
    }
  };

  private revealSafeAdjacents = (point: Point) => {
    const adjacents = this.board.getAdjacentCells(point.r, point.c);
    debugger;
    for (let i = 0; i < adjacents.length; i++) {
      const check = adjacents[i];
      if (!check.revealed && !check.hasMine) {
        check.revealed = true;
        if (check.adjacentMines === 0) {
          this.revealSafeAdjacents(check.location);
        }
      }
    }
  };

  cellTriggered(result: TriggerResult) {}
}
