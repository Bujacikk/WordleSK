import { Injectable } from '@angular/core';
import { WordEditingService } from '../word-editing/word-editing.service'
import { BoxPaintingService } from '../box-painting/box-painting.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GameLoopService {
  matrix: string[][] = 
  [['','','','','',],
  ['','','','','',],
  ['','','','','',],
  ['','','','','',],
  ['','','','','',],
  ['','','','','',]]

  matrixLength = this.matrix[0].length;
  row = 0;
  isEnded = false;
  isDifficultyHard = true;
  isDisabled = false;


  // Vrati hodnotu stlpca v mriezke
  public getColumn(): number
  {
    var counter = 0;
    for(let i = 0; i < this.matrixLength; i++)
    {
      if(this.matrix[this.row][i] != '')
      {
        counter++;
      }
    }
    return counter;
  }

  // Posle pismeno do mriezky
  public sentLetter(letter: string): void {
    if(this.isEnded == false)
    {
      if(letter.length != 1) return;
    
      for(let i = 0; i < this.matrixLength; i++)
      {
        if(this.matrix[this.row][i] == '')
        {
          this.matrix[this.row][i] = letter;
          return;
        }
      }
    }
  }

  //Vymazavanie znaku
  public backspace(): void{
    this.matrix[this.row][this.getColumn()-1] = '';
  }

  //Potvrdi slovo v mriezke
  public enter(): void {
    console.log("Diff = " + this.isDifficultyHard)
    this.isDisabled = true;
    this.boxPainting.getArrayOfColorForKeyBoard(this.takeAGuess(), this.checkWord(this.takeAGuess()));
    if(this.getColumn() == 5)
    {
      var numberAnwers = this.checkWord(this.takeAGuess());
      this.boxPainting.addRowNumbersIntoMatrixColor(numberAnwers, this.row);
      if(this.sumArray(numberAnwers) == 5)
      {
        this.isEnded = true;
      }
      this.row++;
    }
    if(this.row == this.matrixLength) return;
  }

  //Vrati slovo ktore uzivatel zadal do mriezky
  public takeAGuess() : string{
    var word: string = '';
    for(let i = 0; i < 5; i++)
    {
        word = word + this.matrix[this.row][i];
    }
    return word;
  }

  // Skontroluje vitazne slovo
  public checkWord(word1: string): number[] {
    var word2 = this.wordEditingService.getWord().toUpperCase() // Tu je chyba
    var repeat = false;
    const result: number[] = [];

    if (word1 === word2) {
      for (let i = 0; i < word1.length; i++) {
        result.push(1);
      }
      return result;
    }

    let minLength = Math.min(word1.length, word2.length);

    for (let i = 0; i < minLength; i++) {
      for (let x = 0; x < i; x++) {
        if (word1.charAt(x) === word1.charAt(i)) {
          repeat = true;
        }
      }
      
      if (repeat === false) {
        if (word1.charAt(i) === word2.charAt(i)) {
          result.push(1);
          
        } else if (word2.includes(word1.charAt(i))) {
          result.push(3);
          
        } else {
          result.push(2);
          
        }
      } 
      else{
        result.push(2);
        repeat = false;
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
  public resetGame(): void
  {
    this.isDisabled = false;
    
    this.boxPainting.clearTuple();
    this.boxPainting.resetColorForKeyboard();
    this.isEnded = false;
    for(let i = 0; i < 6; i++)
    {
        for(let y = 0; y < 5; y++)
        {
          this.matrix[i][y] = '';
          this.boxPainting.clearMatrixColor(i,y);
          this.row = 0;
          this.boxPainting.setColorRow(0);
          this.boxPainting.setColorColumn(0);
        }
    }
  }
  

  public getIsDisabled(): boolean {
    return this.isDisabled;
  }

  public getIsDifficultyHard(): boolean {
    return this.isDifficultyHard;
  }

  public getRow(){
    return this.row;
  }

  public getIsEnded(){
    return this.isEnded;
  }

  // Vrati maticu
  public getMatrix() : string[][]
  {
    return this.matrix;
  }

  constructor(private wordEditingService: WordEditingService, 
    private boxPainting: BoxPaintingService) { }
}
