import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordEditingService {
  guessedWord = 'päťka'
  guessedWordCopy = 'päťka'

  // Funkcia nahradí v slove specialne znaky pre lahku obtiažnosť
  public removeSpecialCharsFromWord(word: string): string {
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
  
    for (let i = 0; i < word.length; i++) {
      const znak = word[i];
      const nahradnyZnak = specialneZnaky[znak];
  
      if (nahradnyZnak) {
        upraveneSlovo += nahradnyZnak;
      } else {
        upraveneSlovo += znak;
      }
    }
  
    return upraveneSlovo;
  }

  public getWord(): string {
    return this.guessedWord;
  }

  public setGuessedWord(newWord : string)
  {
    this.guessedWord = newWord;
  }

  public switchDiff(diff : string)
  {
    if(diff === "easy")
      {
        this.guessedWordCopy = this.guessedWord;
        this.guessedWord = this.removeSpecialCharsFromWord(this.guessedWord);
      }
    if(diff === "hard")
      {
      this.guessedWord = this.guessedWordCopy;
    }
    
  }

  constructor() { }
}
