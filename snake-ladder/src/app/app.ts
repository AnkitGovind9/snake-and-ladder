import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})

export class AppComponent {
  playerPositions: number[] = [1, 1]; // two players
  currentPlayer: number = 0; // index of player whose turn it is
  previousPositions: number[] = [1, 1]; // previous positions of players

  snakes: { [key: number]: number } = {
    99: 2, 30: 9, 88: 13, 95: 15, 41: 23, 59: 26, 64: 33, 69: 48, 85: 25, 68: 48, 51: 34, 92: 66, 82: 60
  };
  
  ladders: { [key: number]: number } = {
    8: 27, 19: 37, 21: 87, 28: 47, 32: 67, 50: 77, 54: 72, 62: 81, 78: 96, 71: 91
  };

  movePlayer(steps: number) {
    this.previousPositions[this.currentPlayer] = this.playerPositions[this.currentPlayer];
    let newPosition = this.playerPositions[this.currentPlayer] + steps;
    if (newPosition > 100) newPosition = 100;
    if (this.ladders[newPosition]) {
      console.log(`Player ${this.currentPlayer + 1} climbs ladder from ${newPosition} to ${this.ladders[newPosition]}`);
      newPosition = this.ladders[newPosition];
    }
    if (this.snakes[newPosition]) {
      console.log(`Player ${this.currentPlayer + 1} bitten by snake from ${newPosition} to ${this.snakes[newPosition]}`);
      newPosition = this.snakes[newPosition];
    }
    this.playerPositions[this.currentPlayer] = newPosition;
    if (newPosition === 100) {
      console.log(`Player ${this.currentPlayer + 1} wins! 🎉`);
      alert(`Player ${this.currentPlayer + 1} wins! 🎉`);
    }
    this.currentPlayer = (this.currentPlayer + 1) % this.playerPositions.length;
  }
}