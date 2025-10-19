// import { Component } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from './services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})

export class AppComponent implements OnInit, OnDestroy {
  name = '';
  roomId = ''; // simple room id (string)
  isHost = false;
  desiredPlayers = 2; // host chooses 1..4
  joined = false;
  playerNumber: number | null = null; // 0-based
  playerId = '';
  players: { name: string; id: string }[] = [];
  positions: number[] = [];
  currentPlayer = 0;
  maxPlayers = 4;
  subscriptions: Subscription[] = [];

  // snakes & ladders are from server; keep local copy for drawing board
  snakes: { [k: number]: number } = {};
  ladders: { [k: number]: number } = {};

  constructor(private socket: SocketService) {}

  ngOnInit() {
    this.socket.connect();
    // handle assignment to client
    this.subscriptions.push(this.socket.on('roomUpdate').subscribe((data) => {
      this.players = data.players || [];
      this.positions = data.positions || [];
      this.currentPlayer = data.currentPlayer ?? 0;
      this.snakes = data.snakes || {};
      this.ladders = data.ladders || {};
    }));

    this.subscriptions.push(this.socket.on('playerAssigned').subscribe((data: any) => {
      // server sends private assignment
      this.playerNumber = data.playerNumber;
      this.playerId = data.playerId;
      this.joined = true;
    }));

    this.subscriptions.push(this.socket.on('gameOver').subscribe((payload: any) => {
      alert(payload.message);
    }));
  }

  createRoom() {
    if (!this.name.trim()) { alert('Enter name'); return; }
    this.isHost = true;
    this.roomId = Math.random().toString(36).slice(2, 8);
    this.socket.emit('createRoom', { roomId: this.roomId, name: this.name, desiredPlayers: this.desiredPlayers });
  }

  joinRoom() {
    if (!this.name.trim() || !this.roomId.trim()) { alert('Enter name and room id'); return; }
    this.socket.emit('joinRoom', { roomId: this.roomId, name: this.name });
  }

  startGame() {
    if (!this.isHost) return;
    this.socket.emit('startGame', { roomId: this.roomId });
  }

  onDiceRolled(value: number) {
    if (this.playerNumber === null) return;
    // emit roll request — server will validate turn and produce result
    this.socket.emit('requestRoll', { roomId: this.roomId, playerNumber: this.playerNumber, requestedValue: value });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.socket.disconnect();
  }
}