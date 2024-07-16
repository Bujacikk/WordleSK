import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class WordEditingService {
  guessedWord = '';
  guessedWordCopy = '';
  value: any;

  constructor(private firebaseService: FirebaseService) { }

  public generateRandomNumber(): number {
    const min = 1;
    const max = 8391;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Funkcia nahradí v slove specialne znaky pre lahku obtiažnosť
  public removeSpecialCharsFromWord(word: string): string {
    const specialneZnaky: { [key: string]: string } = {
      Ľ: 'L', Š: 'S',
      Č: 'C', Ť: 'T',
      Ž: 'Z', Ý: 'Y',
      Á: 'A', Í: 'I',
      É: 'E', Ĺ: 'L',
      Ď: 'D', Ŕ: 'R',
      Ó: 'O', Ú: 'U',
      Ä: 'A', Ň: 'N',
      Ô: 'O',
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
        console.log("Easy je " + this.guessedWord);
      }
    if(diff === "hard")
      {
       this.guessedWord = this.guessedWordCopy;
       console.log("Hard je " + this.guessedWord);
      }
    
  }

  getValueByKey(key: string) {
    this.firebaseService.getStringByKey(key).subscribe(data => {
      this.value = data;
      this.value = this.value.substring(0,5)  // Lebo tam je biely znak neviem odkial
      this.setGuessedWord(this.value);
      console.log(this.getWord());
      
    });
  }

}
