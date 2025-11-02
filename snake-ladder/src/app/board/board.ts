import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: false,
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class BoardComponent implements OnInit {
  @Input() playerPositions: number[] = []; 
  @Input() playerIcons: string[] = []; 
  @Input() snakes: { [key: number]: number } = {};
  @Input() ladders: { [key: number]: number } = {};

  board: number[][] = [];

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
}
