import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dice',
  standalone: false,
  templateUrl: './dice.html',
  styleUrl: './dice.scss'
})
export class DiceComponent {
  rolling = false;
  @Output() diceRolled = new EventEmitter<number>();

  rollDice() {
    if (this.rolling) return;
    this.rolling = true;
    setTimeout(() => {
      const value = Math.floor(Math.random() * 6) + 1;
      this.rolling = false;
      this.diceRolled.emit(value);
    }, 800);
  }
}