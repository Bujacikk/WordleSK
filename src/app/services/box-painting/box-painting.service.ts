import { Injectable } from '@angular/core';
import { GameLoopService } from '../gameloop/game-loop.service';

@Injectable({
  providedIn: 'root'
})
export class BoxPaintingService {

  // 0 - WHITE
  // 1 - GREEN
  // 2 - GREY
  // 3 - YELLOW
  matrixColor: number[][] = 
  [[0,0,0,0,0,],
  [0,0,0,0,0,],
  [0,0,0,0,0,],
  [0,0,0,0,0,],
  [0,0,0,0,0,],
  [0,0,0,0,0,]]

  public dvojice: [string, string][] = [
  ];
  colorRow = 0;
  colorColumn = 0;
   
  // Resetuje/setuje defaultne farby pre klavesnicu
  public resetColorForKeyboard()
  {
    for(let x = 65; x < 91; x++)
    {
      let char = String.fromCharCode(x);
      this.dvojice.push([char, '#818384']);
    }
    this.dvojice.push(['Ľ', '#818384']);
    this.dvojice.push(['Š', '#818384']);
    this.dvojice.push(['Č', '#818384']);
    this.dvojice.push(['Ť', '#818384']);
    this.dvojice.push(['Ž', '#818384']);
    this.dvojice.push(['Ý', '#818384']);
    this.dvojice.push(['Á', '#818384']);
    this.dvojice.push(['Í', '#818384']);
    this.dvojice.push(['É', '#818384']);
    this.dvojice.push(['Ĺ', '#818384']);
    this.dvojice.push(['Ď', '#818384']);
    this.dvojice.push(['Ŕ', '#818384']);
    this.dvojice.push(['Ó', '#818384']);
    this.dvojice.push(['Ú', '#818384']);
    this.dvojice.push(['Ä', '#818384']);
    this.dvojice.push(['Ň', '#818384']);
    this.dvojice.push(['Ô', '#818384']);
  }
  
  // Funkcia dokáže nastavit/zmeniť farbu v tuple pre pismeno
  public setColorForKey(letter: string, color: string)
  {
    for(let x = 0; x < this.dvojice.length; x++)
    {
      if((letter == this.dvojice[x][0]) && ((color === 'green') || (color === '#b59f3b' && this.dvojice[x][1] !== 'green') || (color === '#333331' && this.dvojice[x][1] !== 'green' && this.dvojice[x][1] !== '#b59f3b')))
      {
        this.dvojice.splice(x,1)
        this.dvojice.push([letter, color])
      }
    }
  }

  // Funkcia čita farbu na zaklade pismena z tuple do divka
  public getBackgroundColorKey(letter: string) : string
  {
    for(let x = 0; x < this.dvojice.length; x++)
    {
      if(letter == this.dvojice[x][0]) return this.dvojice[x][1]
    }
    return 'white';
  }

  // Funkcia prechadza polom a vrati ake cislo je na kazdej pozicii
  public colorState() : number
  {
    var color = this.matrixColor[this.colorRow][this.colorColumn];
    if(this.colorColumn < 4)
    {
      this.colorColumn++;
    }
    else
    {
      this.colorColumn = 0;
      this.colorRow++;
    }
    if(this.colorRow == 6)
    {
      this.colorRow = 0;
      this.colorColumn = 0;
    }
    return color;
  }

// Funkcia vrati na aku farbu sa ma zmenit policko
  public getColor(number : number) : string
  {
    switch (number) {
        case 0:
            return 'none';
        case 1:
            return 'green';
        case 2:
            return '#333331';
        default:
            return '#b59f3b';
    }
  }

  // Funkcia zmeni farby pre pismena po stlačeni enter
  public getArrayOfColorForKeyBoard(guessedWord: string, numberAnwers: number[])
  {
    //var guessedWord = this.takeAGuess();
    //var numberAnwers = this.checkWord(guessedWord);
    for(let x = 0; x < guessedWord.length; x++)
    {
      this.setColorForKey(guessedWord[x], this.getColor(numberAnwers[x]))
    }
  }
  
  public addRowNumbersIntoMatrixColor(numbers: number[], row: number) : void
  {
      for(let i = 0; i < numbers.length; i++)
      {
        this.matrixColor[row][i] = numbers[i];
      }
  }
  
  public setColorRow(number: number)
  {
      this.colorRow = number;
  }

  public setColorColumn(number: number)
  {
      this.colorColumn = number;
  }

  public clearTuple()
  {
    this.dvojice = [];
  }

  public clearMatrixColor(i : number, y : number)
  {
      this.matrixColor[i][y] = 0;
  }

  public getMatrixColor()
  {
    return this.matrixColor;
  }

  public getTuple()
  {
    return this.dvojice;
  }

  constructor() { } 
}
