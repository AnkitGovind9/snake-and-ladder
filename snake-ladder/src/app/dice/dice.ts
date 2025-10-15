import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dice',
  standalone: false,
  templateUrl: './dice.html',
  styleUrl: './dice.scss'
})
export class DiceComponent {
  diceValue: number = 1;
  @Output() diceRolled = new EventEmitter<number>();

  rollDice() {
    this.diceValue = Math.floor(Math.random() * 6) + 1;
    this.diceRolled.emit(this.diceValue);
  }
}