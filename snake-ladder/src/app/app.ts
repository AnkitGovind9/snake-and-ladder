import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})

export class AppComponent implements OnInit {
  playerPositions: number[] = [];
  previousPositions: number[] = [];
  currentPlayer: number = 0;
  playerIcons: string[] = [];
  playerNames: string[] = []; // ✅ NEW: store player names
  maxPlayers = 4;

  snakes: { [key: number]: number } = {
    99: 2, 30: 9, 88: 13, 95: 15, 41: 23, 59: 26, 64: 33, 69: 48, 85: 25, 68: 48, 51: 34, 92: 66, 82: 60
  };
  
  ladders: { [key: number]: number } = {
    8: 27, 19: 37, 21: 87, 28: 47, 32: 67, 50: 77, 54: 72, 62: 81, 78: 96, 71: 91
  };

  ngOnInit() {
    this.initializePlayers();
  }

  initializePlayers() {
    let numPlayers: number | null = null;
  
    while (true) {
      const input = prompt(`Enter number of players (1-${this.maxPlayers}):`);
      if (input === null) {
        alert('Game setup cancelled.');
        return; // exit setup if user cancels
      }

      numPlayers = parseInt(input, 10);

      if (!isNaN(numPlayers) && numPlayers >= 1 && numPlayers <= this.maxPlayers) {
        break; // valid input → exit loop
      } else {
        alert(`❌ Invalid input! Please enter a number between 1 and ${this.maxPlayers}.`);
      }
    }

    this.playerPositions = new Array(numPlayers).fill(1);
    this.previousPositions = new Array(numPlayers).fill(1);

    // Unique colored emojis
    const emojis = ['🔴', '🟢', '🔵', '🟡', '🟣', '🟠'];
    this.playerIcons = emojis.slice(0, numPlayers);

    for (let i = 0; i < numPlayers; i++) {
      let name = prompt(`Enter name for Player ${i + 1} ${this.playerIcons[i]}:`) || `Player ${i + 1}`;
      name = name.trim() === '' ? `Player ${i + 1}` : name;
      this.playerNames.push(name);
    }
  }

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
      alert(`🎉 Player ${this.currentPlayer + 1} (${this.playerIcons[this.currentPlayer]}) wins!`);
      return;
    }

    this.currentPlayer = (this.currentPlayer + 1) % this.playerPositions.length;
  }
}
