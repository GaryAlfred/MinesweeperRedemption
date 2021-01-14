import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MinesweeperBoardComponent } from './minesweeper-board/minesweeper-board.component';
import { MinesweeperCellComponent } from './minesweeper-cell/minesweeper-cell.component';

@NgModule({
  declarations: [AppComponent, MinesweeperBoardComponent, MinesweeperCellComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
