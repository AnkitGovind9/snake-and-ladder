import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app';
import { BoardComponent } from './board/board';
import { DiceComponent } from './dice/dice';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    DiceComponent
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
