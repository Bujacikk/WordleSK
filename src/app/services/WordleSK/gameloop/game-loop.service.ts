import { Injectable } from '@angular/core';
import { WordEditingService } from '../word-editing/word-editing.service'
import { BoxPaintingService } from '../box-painting/box-painting.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameLoopService {
  matrix: string[][] =
    [['', '', '', '', '',],
    ['', '', '', '', '',],
    ['', '', '', '', '',],
    ['', '', '', '', '',],
    ['', '', '', '', '',],
    ['', '', '', '', '',]]
  
  matrixLength = this.matrix[0].length;
  row = 0;
  isEnded = false;
  isDifficultyHard = new Subject<boolean>();
  isDisabled = new Subject<boolean>();
  isWin = new BehaviorSubject<boolean | undefined>(false);

  constructor(private wordEditingService: WordEditingService,
    private boxPainting: BoxPaintingService) { }

  // Vrati hodnotu stlpca v mriezke
  public getColumn(): number {
    var counter = 0;
    for (let i = 0; i < this.matrixLength; i++) {
      if (this.matrix[this.row][i] != '') {
        counter++;
      }
    }
    return counter;
  }

  // Vráti prázdnu poziciu na ktorej sa práve nachádza
  public getCurrentFreePossition(): number {
    for (let i = 0; i < this.matrixLength; i++) {
      if (this.matrix[this.row][i] == '') {
        return i;
      }
    }
    return 10;
  }

  public getHint(){
      var possition = this.getCurrentFreePossition()
      if(possition != 10) this.sentLetter(this.wordEditingService.getWord()[possition]);
  }

  // Posle pismeno do mriezky
  public sentLetter(letter: string): void {
    if (this.isEnded == false) {
      if (letter.length != 1) return;

      for (let i = 0; i < this.matrixLength; i++) {
        if (this.matrix[this.row][i] == '') {
          this.matrix[this.row][i] = letter;
          return;
        }
      }
    }
  }

  //Vymazavanie znaku
  public backspace(): void {
    this.matrix[this.row][this.getColumn() - 1] = '';
  }

  // Funkcia nastaví, ktorý riadok sa ma animovať
  public setAnimation(row : number){
    this.boxPainting.setAnimation(row)
  }

  //Potvrdi slovo v mriezke
  public enter(): void {
    if (this.getColumn() == 5) {
      this.setAnimation(this.row);
      this.isDisabled.next(true);
      this.boxPainting.getArrayOfColorForKeyBoard(this.takeAGuess(), this.checkWord(this.takeAGuess()));

      var numberAnwers = this.checkWord(this.takeAGuess());
      this.boxPainting.addRowNumbersIntoMatrixColor(numberAnwers, this.row);
      if (this.sumArray(numberAnwers) == 5) {
        this.isEnded = true;
        this.isWin.next(true);
        return;
      }
      if (this.row < 5) 
      { 
        this.row++ //Stupidny fix, ale neslo inak
      }
      else 
      {
        this.isEnded = true;
        this.isWin.next(false)   
        return;
      }
      return
    }
  }

  //Vrati slovo ktore uzivatel zadal do mriezky
  public takeAGuess(): string {
    var word: string = '';
    for (let i = 0; i < 5; i++) {
      word = word + this.matrix[this.row][i];
    }
    return word;
  }

  // Skontroluje vitazne slovo
  public checkWord(word1: string): number[] {
    var word2 = this.wordEditingService.getWord();

    let result: number[] = [];

    // Skontroluje ci su stringy rovnake
    if (word1 === word2) {
      for (let i = 0; i < word1.length; i++) {
        result.push(1);
      }
      return result;
    }

    let minLength = Math.min(word1.length, word2.length);

    // Mapy na sledovanie výskytov písmen
    let word1CharCount: { [key: string]: number } = {};
    let word2CharCount: { [key: string]: number } = {};

    // Spočítame výskyty každého písmena v word1 a word2
    for (let i = 0; i < minLength; i++) {
      word1CharCount[word1[i]] = (word1CharCount[word1[i]] || 0) + 1;
      word2CharCount[word2[i]] = (word2CharCount[word2[i]] || 0) + 1;
    }

    for (let i = 0; i < minLength; i++) {
      if (word1[i] === word2[i]) {
        result.push(1);
      } else if (word2.includes(word1[i])) {
        if (word1CharCount[word1[i]] > 1) {
          result.push(3);
        } else {
          result.push(3);
        }
      } else {
        result.push(2);
      }
    }
    return result;
  }


  public sumArray(arr: number[]): number {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }

  // Resetuje hru
  public resetGame(): void {
    this.wordEditingService.getValueByKey(this.wordEditingService.generateRandomNumber().toString());
    this.isDisabled.next(false);
    this.boxPainting.clearTuple();
    this.boxPainting.resetColorForKeyboard();
    this.isEnded = false;
    this.isWin.next(undefined);
    
    for (let i = 0; i < 6; i++) {
      for (let y = 0; y < 5; y++) {
        this.matrix[i][y] = '';
        this.boxPainting.clearMatrixColor(i, y);
        this.row = 0;
        this.boxPainting.setColorRow(0);
        this.boxPainting.setColorColumn(0);
        this.boxPainting.resetIsRowAnimated(i,y);
      }
    }
  }

  public setIsDifficultyHard(diff : boolean) {
    this.isDifficultyHard.next(diff);
  }

  public getIsWin(){
    return this.isWin.getValue();
  }

  public getRow() {
    return this.row;
  }

  public getIsEnded() {
    return this.isEnded;
  }

  // Vrati maticu
  public getMatrix(): string[][] {
    return this.matrix;
  }
}
