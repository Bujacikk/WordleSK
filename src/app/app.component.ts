import { Component, HostListener } from '@angular/core';
import { WordEditingService } from './services/word-editing/word-editing.service'
import { GameLoopService } from './services/gameloop/game-loop.service';
import { BoxPaintingService } from './services/box-painting/box-painting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private wordEditingService: WordEditingService,
    private gameLoop: GameLoopService,
    private boxPainting: BoxPaintingService) { }

  isEnded = false;
  row = 0;
  matrix = this.gameLoop.getMatrix();
  matrixColor = this.boxPainting.getMatrixColor();
  matrixLength = this.matrix[0].length;
  isDifficultyHard = this.gameLoop.getIsDifficultyHard();
  isDisabled = this.gameLoop.getIsDisabled();
  dvojice = this.boxPainting.getTuple();
  isRowAnimated = this.boxPainting.getIsRowAnimated();

  ngOnInit(): void {
    this.resetColorForKeyboard();
    this.updateVariables();
    this.wordEditingService.getValueByKey(this.wordEditingService.generateRandomNumber().toString());
  }

  public getHint(){
    this.gameLoop.getHint();
  }

  // Resetuje/setuje defaultne farby pre klavesnicu
  public resetColorForKeyboard() {
    this.boxPainting.resetColorForKeyboard();
  }

  // Funkcia dokáže nastavit/zmeniť farbu v tuple pre pismeno
  public setColorForKey(letter: string, color: string) {
    this.boxPainting.setColorForKey(letter, color);
  }

  // Funkcia čita farbu na zaklade pismena z tuple do divka
  public getBackgroundColorKey(letter: string): string {
    return this.boxPainting.getBackgroundColorKey(letter)
  }

  // Slider meni obtiažnosť
  public changeStateOfSlide() {
    this.isDifficultyHard = !this.isDifficultyHard;
    if (this.isDifficultyHard == true) {
      // Hard
      this.wordEditingService.switchDiff("hard")
    }
    else {
      // Easy
      this.wordEditingService.switchDiff("easy")
    }
  }

  // Funkcia vrati na aku farbu sa ma zmenit policko
  public getColor(number: number): string {
    return this.boxPainting.getColor(number);
  }

  // Funkcia prechadza polom a vrati ake cislo je na kazdej pozicii
  public colorState(): number {
    return this.boxPainting.colorState();
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


  // Posle pismeno do mriezky
  public sentLetter(letter: string): void {
    //console.log(this.gameLoop.getIsEnded())
    if (this.gameLoop.getIsEnded() == false) {
      this.gameLoop.sentLetter(letter);
    }
  }

  //Vymazavanie znaku
  public backspace(): void {
    this.gameLoop.backspace();
  }

  //Potvrdi slovo v mriezke
  public enter(): void {
    this.gameLoop.enter();
    this.updateVariables();
  }

  // Resetuje hru
  public resetGame(): void {
    this.gameLoop.resetGame();
    this.updateVariables();
  }

  public updateVariables(): void {
    this.matrix = this.gameLoop.getMatrix();
    this.row = this.gameLoop.getRow();
    this.isDisabled = this.gameLoop.getIsDisabled();
    //this.isDifficultyHard = this.gameLoop.getIsDifficultyHard();
    this.matrixLength = this.gameLoop.getMatrix()[0].length;
    this.isEnded = this.gameLoop.getIsEnded();
    this.isRowAnimated = this.boxPainting.getIsRowAnimated();
  }

}

