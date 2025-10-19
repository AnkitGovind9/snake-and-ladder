import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  standalone: false,
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class BoardComponent implements OnInit {
  
  board: number[][] = [];
  @Input() playerPositions: number[] = []; // for multiple players
  @Input() snakes: { [key: number]: number } = {};
  @Input() ladders: { [key: number]: number } = {};
  @Input() hideOtherPlayers: boolean = false; // hide other players' details
  @Input() myPlayerNumber: number | null = null;

  // ladderList: any[] = [];
  // snakeList: any[] = [];

  // cellSize = 100;
  // playerIcons: string[] = ['🎯', '🟢']; // emoji for each player

  playerIcons = ['🎯','🟢','🔷','🔶'];

  ngOnInit() {
    this.generateBoard();
  }

  generateBoard() {
    const size = 10;
    let count = 100;
    this.board = [];
    for (let i = 0; i < size; i++) {
      let row: number[] = [];
      for (let j = 0; j < size; j++) {
        row.push(count--);
      }
      if (i % 2 === 1) row.reverse();
      this.board.push(row);
    }
  }

  tokensAt(cell: number): { idx: number; icon: string }[] {
    const tokens: { idx: number; icon: string }[] = [];
    this.playerPositions.forEach((pos, idx) => {
      if (pos === cell) {
        // if hideOtherPlayers true, only show if token is mine
        if (!this.hideOtherPlayers || this.myPlayerNumber === idx) {
          tokens.push({ idx, icon: this.playerIcons[idx] || '⭕' });
        }
      }
    });
    return tokens;
  }

  isSnakeStart(cell: number) {
    return !!this.snakes[cell];
  }
  
  isLadderStart(cell: number) {
    return !!this.ladders[cell];
  }
}