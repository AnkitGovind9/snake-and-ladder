import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  standalone: false,
  templateUrl: './player.html',
  styleUrl: './player.scss'
})
export class PlayerComponent {
  @Input() name = '';
  @Input() number: number | null = null;
  @Input() position = 1;
}