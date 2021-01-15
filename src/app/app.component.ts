import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MSBoard, Point } from "./ms-board";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public appBoard: MSBoard = new MSBoard(1, 1);
  public numMines = 0;
  public lastSize: Point = { r: 3, c: 3 };

  ngOnInit() {
    this.setBoardSize(3, 3);
  }

  setBoardSize = (r = 3, c = 3) => {
    this.lastSize = { r, c };
    const cellCount = r * c;
    this.numMines = Math.max(1, Math.floor(cellCount / 6));
    this.appBoard = new MSBoard(r, c);
    this.appBoard.initialize();
    this.appBoard.populate_mines(this.numMines);
    this.appBoard.finalize();
  };

  public endGame = () => {
    alert("GAME OVER MAN!");
    this.setBoardSize(this.lastSize.r, this.lastSize.c);
  };

  public winGame = () => {
    alert("YOU WIN !!!!");
    this.setBoardSize(this.lastSize.r, this.lastSize.c);
  };
}
