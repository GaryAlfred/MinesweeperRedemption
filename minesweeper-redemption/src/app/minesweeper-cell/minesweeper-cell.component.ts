import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MSCell } from '../ms-cell';

@Component({
  selector: 'minesweeper-cell',
  templateUrl: './minesweeper-cell.component.html',
  styleUrls: ['./minesweeper-cell.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MinesweeperCellComponent implements OnInit {
  @Input()
  public cell: MSCell = new MSCell({ r: -1, c: -1 });

  public revealed = false;

  constructor() {}

  ngOnInit(): void {}
}
