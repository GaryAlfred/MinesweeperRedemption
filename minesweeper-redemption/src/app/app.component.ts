import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MSBoard } from './ms-board';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  public appBoard: MSBoard = new MSBoard(1, 1);

  ngOnInit() {
    this.setBoardSize(3, 3);
  }

  setBoardSize(r = 20, c = 10) {
    const cellCount = r * c;
    const numMines = Math.max(1, Math.floor(cellCount / 6));
    this.appBoard = new MSBoard(r, c);
    this.appBoard.initialize();
    this.appBoard.populate_mines(numMines);
    this.appBoard.finalize();
  }

  public endGame = () => {
    alert('GAME OVER MAN!');
    this.setBoardSize();
  };
}
