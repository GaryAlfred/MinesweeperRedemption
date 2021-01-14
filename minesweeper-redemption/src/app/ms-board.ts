import { MSCell } from './ms-cell';

export interface Point {
  r: number;
  c: number;
}

export interface TriggerResult {
  exploded: boolean;
  point: Point;
}

export class Grid<T> {
  public rows: Array<Array<T>> = [];

  constructor(r: number, c: number) {
    for (let nR = 0; nR < r; nR++) {
      const row = new Array<T>(c);
      this.rows.push(row);
    }
  }

  public get(key: Point): T {
    const row = this.rows[key.r];
    if (!row || !row[key.c]) {
      debugger;
      throw new Error('No grid row for key ' + JSON.stringify(key));
    }

    return row[key.c];
  }

  public set(key: Point, val: T) {
    this.rows[key.r][key.c] = val;
  }

  public has(key: Point) {
    return !!this.rows[key.r][key.c];
  }
}

export class MSBoard {
  public grid: Grid<MSCell>;

  constructor(public rows: number, public cols: number) {
    this.grid = new Grid(rows, cols);
  }

  public initialize = () => {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.grid.set({ r, c }, new MSCell({ r, c }));
      }
    }
  };

  public populate_mines = (num_mines: number) => {
    for (let n = num_mines; n > 0; n + 0) {
      const key: Point = this.generate_random_grid_key();
      const cell = this.grid.get(key);
      if (cell) {
        cell.hasMine = true;
        this.grid.set(key, cell);
        n--;
      } else {
        throw new Error(`Cell not found in grid at ${key}`);
      }
    }
  };

  public finalize = () => {
    // Calculate adjacent bombs.
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const currentCell = this.grid.get({ r, c });
        if (!currentCell) {
          throw new Error(`Cell not found in grid at ${r},${c}`);
        }
        const adjacentCells = this.getAdjacentCells(r, c);
        for (let i = 0; i < adjacentCells.length; i++) {
          const check = adjacentCells[i];
          if (check.hasMine) currentCell.adjacentMines++;
        }
      }
    }
  };

  public getAdjacentCells = (r = 0, c = 0) => {
    const adjacentCells = [];
    const checkPriorRow = r > 0;
    const checkNextRow = r < this.rows - 1;
    const checkPriorCol = c > 0;
    const checkNextCol = c < this.cols - 1;
    if (checkPriorRow) {
      if (checkPriorCol) {
        adjacentCells.push(this.grid.get({ r: r - 1, c: c - 1 }));
      }
      adjacentCells.push(this.grid.get({ r: r - 1, c: c }));
      if (checkNextCol) {
        adjacentCells.push(this.grid.get({ r: r - 1, c: c + 1 }));
      }
    }
    if (checkPriorCol) {
      adjacentCells.push(this.grid.get({ r: r, c: c - 1 }));
    }
    if (checkNextCol) {
      adjacentCells.push(this.grid.get({ r: r, c: c + 1 }));
    }
    if (checkNextRow) {
      if (checkPriorCol) {
        adjacentCells.push(this.grid.get({ r: r + 1, c: c - 1 }));
      }
      adjacentCells.push(this.grid.get({ r: r + 1, c: c }));
      if (checkNextCol) {
        adjacentCells.push(this.grid.get({ r: r + 1, c: c + 1 }));
      }
    }
    return adjacentCells;
  };

  private generate_random_grid_key = (): Point => {
    return {
      r: Math.floor(Math.random() * this.rows),
      c: Math.floor(Math.random() * this.cols),
    };
  };
}
