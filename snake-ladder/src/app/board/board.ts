import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: false,
  templateUrl: './board.html',
  styleUrl: './board.scss'
})
export class BoardComponent implements OnInit {
  
  board: number[][] = [];
  @Input() playerPositions: number[] = []; // changed from single playerPosition
  @Input() snakes: { [key: number]: number } = {};
  @Input() ladders: { [key: number]: number } = {};

  ladderList: any[] = [];
  snakeList: any[] = [];

  cellSize = 100;
  playerIcons: string[] = ['🎯', '🟢']; // emoji for each player
  
  ngOnInit() {
    this.generateBoard();
  }

  generateBoard() {
    const size = 10;
    let count = 100;
    for (let i = 0; i < size; i++) {
      let row: number[] = [];
      for (let j = 0; j < size; j++) {
        row.push(count--);
      }
      if (i % 2 === 1) row.reverse();
      this.board.push(row);
    }
  }

  // createLines() {
  //   this.ladderList = Object.keys(this.ladders).map(key => {
  //     const start = Number(key);
  //     const end = this.ladders[start];
  //     return { start: this.cellToXY(start), end: this.cellToXY(end) };
  //   });

  //   this.snakeList = Object.keys(this.snakes).map(key => {
  //     const start = Number(key);
  //     const end = this.snakes[start];
  //     return { start: this.cellToXY(start), end: this.cellToXY(end) };
  //   });
  // }
  
  // cellToXY(cell: number) {
  //   const row = Math.floor((100 - cell) / 10);
  //   const col = (row % 2 === 0) ? (cell - 1) % 10 : 9 - ((cell - 1) % 10);
  //   return { x: col * this.cellSize + this.cellSize / 2, y: row * this.cellSize + this.cellSize / 2 };
  // }
}