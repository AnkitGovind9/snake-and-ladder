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

  // snakes: { [key: number]: number } = {
  //   16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78
  // };

  // ladders: { [key: number]: number } = {
  //   1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100
  // };

  movePlayer(steps: number) {
    this.previousPositions[this.currentPlayer] = this.playerPositions[this.currentPlayer];
    let newPosition = this.playerPositions[this.currentPlayer] + steps;
    if (newPosition > 100) newPosition = 100; // max 100
    this.playerPositions[this.currentPlayer] = newPosition;
    this.currentPlayer = (this.currentPlayer + 1) % this.playerPositions.length;

    // if (this.ladders[this.playerPosition]) {
    //   this.playerPosition = this.ladders[this.playerPosition];
    // }

    // if (this.snakes[this.playerPosition]) {
    //   this.playerPosition = this.snakes[this.playerPosition];
    // }
  }
}