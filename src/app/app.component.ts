import { Component, HostListener } from '@angular/core';
import { Console } from 'console';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  row = 0;
  randomWord = 'päťka'
  copyOfRandomWord = this.randomWord
  isEnded = false;


  matrix: string[][] = 
  [['','','','','',],
  ['','','','','',],
  ['','','','','',],
  ['','','','','',],
  ['','','','','',],
  ['','','','','',]]
  
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
  
  colorRow = 0;
  colorColumn = 0;
  matrixLength = this.matrix[0].length;
  isDifficultyHard = true;
  isDisabled = false;

  public dvojice: [string, string][] = [
    
  ];

  ngOnInit(): void {
    this.resetColorForKeyboard()
  }

  getWord()
  {

  }

  // Funkcia nahradí v slove specialne znaky pre lahku obtiažnosť
  public removeSpecialCharsFromWord(slovo: string): string {
    const specialneZnaky: { [key: string]: string } = {
      ľ: 'l', š: 's',
      č: 'c', ť: 't',
      ž: 'z', ý: 'y',
      á: 'a', í: 'i',
      é: 'e', ĺ: 'l',
      ď: 'd', ŕ: 'r',
      ó: 'o', ú: 'u',
      ä: 'a', ň: 'n',
      ô: 'o',
      // ďalšie špeciálne znaky a ich ekvivalenty
    };
  
    let upraveneSlovo = '';
  
    for (let i = 0; i < slovo.length; i++) {
      const znak = slovo[i];
      const nahradnyZnak = specialneZnaky[znak];
  
      if (nahradnyZnak) {
        upraveneSlovo += nahradnyZnak;
      } else {
        upraveneSlovo += znak;
      }
    }
  
    return upraveneSlovo;
  }


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

  // Funkcia zmeni farby pre pismena po stlačeni enter
  public getArrayOfColorForKeyBoard()
  {
    var guessedWord = this.takeAGuess();
    var numberAnwers = this.checkWord(this.takeAGuess());
    for(let x = 0; x < guessedWord.length; x++)
    {
      this.setColorForKey(guessedWord[x], this.getColor(numberAnwers[x]))
    }
  }

  // Slider meni obtiažnosť
  public changeStateOfSlide(){
      this.isDifficultyHard = !this.isDifficultyHard;
      if(this.isDifficultyHard == true)
      {
        // Hard
        this.randomWord = this.copyOfRandomWord;
      }
      else{
        // Easy
        this.copyOfRandomWord = this.randomWord;
        this.randomWord = this.removeSpecialCharsFromWord(this.randomWord);
      }
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

  // Keyboard input
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    const key = event.key;
    if(key.charCodeAt(0) > 96 && key.charCodeAt(0) < 123)
    {
      this.sentLetter(key.toUpperCase());
    }
    if(this.isDifficultyHard == true)
    {
      switch(key) {
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
      switch(key)
      {
        case 'Enter':
          this.enter()
          break;
        case 'Backspace':
          this.backspace()
          break;
      }
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
    console.log(this.isDifficultyHard)
    this.isDisabled = true;
    this.getArrayOfColorForKeyBoard();
    if(this.getColumn() == 5)
    {
      var numberAnwers = this.checkWord(this.takeAGuess());
      this.addRowNumbersIntoMatrixColor(numberAnwers);
      if(this.sumArray(numberAnwers) == 5)
      {
        this.isEnded = true;
      }
      //this.checkWord(word);
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

  // 1 - GREEN
  // 2 - GREY
  // 3 - YELLOW
  // Skontroluje vitazne slovo
  public checkWord(word1: string): number[] {
    var word2 = this.randomWord.toUpperCase()
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

  public addRowNumbersIntoMatrixColor(numbers: number[]) : void
  {
      for(let i = 0; i < numbers.length; i++)
      {
        this.matrixColor[this.row][i] = numbers[i];
      }
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
    this.dvojice = [];
    this.resetColorForKeyboard();
    this.isEnded = false;
    for(let i = 0; i < 6; i++)
    {
        for(let y = 0; y < 5; y++)
        {
          this.matrix[i][y] = '';
          this.matrixColor[i][y] = 0;
          this.row = 0;
          this.colorRow = 0;
          this.colorColumn = 0;
        }
    }
  }

}
