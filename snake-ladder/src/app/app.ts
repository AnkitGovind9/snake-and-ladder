import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})

export class AppComponent {
  playerPosition = 1;
  previousPosition: number | undefined;

  // snakes: { [key: number]: number } = {
  //   16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24, 93: 73, 95: 75, 98: 78
  // };

  // ladders: { [key: number]: number } = {
  //   1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 100
  // };

  movePlayer(steps: number) {
    this.previousPosition=this.playerPosition;
    this.playerPosition += steps;
    if (this.playerPosition > 100) this.playerPosition = 100;

    // if (this.ladders[this.playerPosition]) {
    //   this.playerPosition = this.ladders[this.playerPosition];
    // }

    // if (this.snakes[this.playerPosition]) {
    //   this.playerPosition = this.snakes[this.playerPosition];
    // }
  }
}