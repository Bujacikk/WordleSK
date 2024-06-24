import { Component, OnInit, HostListener } from '@angular/core';
import { BoxPaintingService } from 'src/app/services/box-painting/box-painting.service';
import { GameLoopService } from 'src/app/services/gameloop/game-loop.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../../pop-up/pop-up.component';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  constructor(private boxPainting: BoxPaintingService,
    private gameLoop: GameLoopService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.gameLoop.isDifficultyHard
    .subscribe(x => 
      this.isDifficultyHard = x);

    this.gameLoop.isWin
    .subscribe(x => 
      this.isWin = x);
  }

  isDifficultyHard = true;
  isWin: boolean | undefined;

  // Funkcia čita farbu na zaklade pismena z tuple do divka
  public getBackgroundColorKey(letter: string): string {
    return this.boxPainting.getBackgroundColorKey(letter)
  }

  // Posle pismeno do mriezky
  public sentLetter(letter: string): void {
    //console.log(this.gameLoop.getIsEnded())
    if (this.gameLoop.getIsEnded() == false) {
      this.gameLoop.sentLetter(letter);
    }
  }

  //Potvrdi slovo v mriezke
  public enter(): void {
    this.gameLoop.enter();
    if(this.isWin == true || this.isWin == false) this.dialog.open(PopUpComponent);
  }

  //Vymazavanie znaku
  public backspace(): void {
    this.gameLoop.backspace();
  }

  // Keyboard input
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    if (key.charCodeAt(0) > 96 && key.charCodeAt(0) < 123) {
      this.sentLetter(key.toUpperCase());
    }
    if (this.isDifficultyHard == true) {
      switch (key) {
        case 'ľ':
          this.sentLetter('Ľ')
          break;
        case 'š':
          this.sentLetter('Š')
          break;
        case 'č':
          this.sentLetter('Č')
          break;
        case 'ť':
          this.sentLetter('Ť')
          break;
        case 'ž':
          this.sentLetter('Ž')
          break;
        case 'ý':
          this.sentLetter('Ý')
          break;
        case 'á':
          this.sentLetter('Á')
          break;
        case 'í':
          this.sentLetter('Í')
          break;
        case 'é':
          this.sentLetter('É')
          break;
        case 'ĺ':
          this.sentLetter('Ĺ')
          break;
        case 'ď':
          this.sentLetter('Ď')
          break;
        case 'ŕ':
          this.sentLetter('Ŕ')
          break;
        case 'ó':
          this.sentLetter('Ó')
          break;
        case 'ú':
          this.sentLetter('Ú')
          break;
        case 'ä':
          this.sentLetter('Ä')
          break;
        case 'ň':
          this.sentLetter('Ň')
          break;
        case 'ô':
          this.sentLetter('Ô')
          break;
      }
    }
    switch (key) {
      case 'Enter':
        if(this.gameLoop.isEnded == false)
          {
            this.enter()
          }
        break;
      case 'Backspace':
        this.backspace()
        break;
    }
  }

}
