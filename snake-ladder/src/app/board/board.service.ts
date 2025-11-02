import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BoardService {
  getDefaultSnakes() {
    return {
      99: 2, 30: 9, 88: 13, 95: 15, 41: 23, 59: 26, 62: 33, 85: 25, 68: 48, 51: 34, 92: 66, 82: 60
    };
  }
  getDefaultLadders() {
    return {
      8: 27, 19: 37, 28: 47, 32: 67, 50: 74, 21: 87
    };
  }
}