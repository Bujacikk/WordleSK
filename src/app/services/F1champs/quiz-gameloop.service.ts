import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CHAMPS } from 'src/app/datas/champs.data';
import { Champ } from 'src/app/interfaces/champs.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizGameloopService {

  champ: Champ = { name: '', imageUrl: '', imageUrlSmall: '', description: '' };
  champsGuess: Champ[] = CHAMPS.slice();
  champsChoices: Champ[] = this.champsGuess.slice();
  choices: String[] = [];
  score: number = 0;
  colors: String[] = ["white","white","white","white"];
  
  observableChamp = new BehaviorSubject<Champ>(this.champ);
  observableChoices = new Subject<String[]>();
  observableScore = new Subject<number>();
  observableDescription = new Subject<string>();
  isEndedRound = new BehaviorSubject<boolean>(false);
  observableColors = new Subject<String[]>();
  isEnded = new BehaviorSubject<boolean>(false);

  // Random champions generator
  public generateRandomNumber(maximum : number): number {
    const min = 0;
    const max = maximum;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //Reset game
  resetGame()
  {
    this.isEnded.next(false);
    this.isEndedRound.next(false);
    this.score = 0;
    this.observableScore.next(this.score);
    this.champsGuess = CHAMPS.slice();
    this.nextChamp();
  }

  // Return random champs for guessing and slice it from array of guessed
  getGuessed(){
    if(this.champsGuess.length > 0)
    {
      const randomArrayPossition = this.generateRandomNumber(this.champsGuess.length - 1);    // Random champ
      this.choices.push(this.champsGuess[randomArrayPossition].name);                         // Pushing champ name into choices
      this.champ = this.champsGuess[randomArrayPossition];                                    // Local variable for guessed champ 
      this.observableChamp.next(this.champsGuess[randomArrayPossition]);                      // Save champ to observable object
      this.observableDescription.next("Uhádni šampióna!");                                    // Save desctiption
      this.champsGuess.splice(randomArrayPossition, 1);                                       // Remove champ from champ pool
      if(this.champsGuess.length == 0) this.isEnded.next(true);                                     
      this.fillChoices();                                                                     // Fill array of choices with other random champ name
      this.observableChoices.next(this.choices);  
    }                                                                    
  }

  
  // Method fill array with original choices
  fillChoices(): void {
    if (this.choices.length < 4) {
      var a = this.generateRandomNumber(33);
      const randomChoice = this.champsChoices[a].name;

      if (!this.choices.includes(randomChoice)) {
        this.choices.push(randomChoice);
      }
      this.fillChoices();
    }
    this.choices = this.shuffleArray(this.choices);
  }

  // Function shuffle array 
  shuffleArray = (array: String[]) => { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
  };
  
  // Add score
  addScore(){
      this.score = this.score + 1;
  }

  // Guess a champ
  takeAGuess(name: String){
    if((name === this.champ.name) && (this.isEndedRound.getValue() == false)) 
      {
        this.observableDescription.next(this.champ.description);
        this.addScore();
        this.observableScore.next(this.score);
        this.isEndedRound.next(true);
        this.setAColor(name, "#4BB543");
      }
    if(this.isEndedRound.getValue() == false) 
      {
        this.isEndedRound.next(true);
        this.setAColor(name, "#E5243F");
        this.setAColor(this.champ.name, "#4BB543");
        this.observableDescription.next(this.champ.description);
      }
  }

  // Set collor for guessed choice
  setAColor(name: String, color: String)
  {
    for(let x = 0; x < 4; x++)
    {
        if(name === this.choices[x])
        {
          this.colors[x] = color;
          this.observableColors.next(this.colors);
          break;
        }
    }
  }

  // Reset method
  nextChamp(){
    console.log(this.score);
    if(this.isEnded.getValue() == false)
    {
      this.colors = this.colors.map(()=> "white");
      this.observableColors.next(this.colors);
      this.choices = [];
      this.getGuessed()
      this.fillChoices();
      this.isEndedRound.next(false);
      this.observableDescription.next("Uhádni šampióna!");
    }
  }
    

  // Return arrays of champs
  getChamps(): Champ[]
  {
    return this.champsGuess;
  }

  // Return choices
  getChoices(): String[]
  {
      return this.choices;
  }

  // Return score
  getScore(): number{
    return this.score;
  }

  // Return guessed champ
  getChamp(){
    return this.observableChamp.getValue();
  }
  constructor() { }
}
