import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app';
import { BoardComponent } from './board/board';
import { DiceComponent } from './dice/dice';
import { FormsModule } from '@angular/forms';
import { Player } from './player/player';
import { SocketService } from './services/socket.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    DiceComponent,
    Player
  ],
  imports: [BrowserModule, FormsModule],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
