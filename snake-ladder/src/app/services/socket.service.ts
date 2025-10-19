// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable()
export class SocketService {
  private socket!: Socket;

  connect(serverUrl = 'http://localhost:3000') {
    this.socket = io(serverUrl, { transports: ['websocket', 'polling'] });
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }

  emit(event: string, payload?: any) {
    this.socket.emit(event, payload);
  }

  on(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data: any) => subscriber.next(data));
      return () => this.socket.off(event);
    });
  }

  once(event: string): Promise<any> {
    return new Promise((resolve) => this.socket.once(event, resolve));
  }
}
