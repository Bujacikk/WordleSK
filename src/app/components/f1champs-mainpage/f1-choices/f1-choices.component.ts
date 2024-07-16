import { Component, OnInit } from '@angular/core';
import { QuizGameloopService } from 'src/app/services/F1champs/quiz-gameloop.service';

@Component({
  selector: 'app-f1-choices',
  templateUrl: './f1-choices.component.html',
  styleUrls: ['./f1-choices.component.scss']
})
export class F1ChoicesComponent implements OnInit {

  constructor(private quizGameloop: QuizGameloopService) { }

  // Array of choices
  choices = this.quizGameloop.getChoices();

  // Colors
  colors: String[] = [];

  ngOnInit(): void {
    this.quizGameloop.observableChoices.subscribe(x => 
      this.choices = x);

    this.quizGameloop.observableColors.subscribe(x =>
        this.colors = x);
  }

  // Take A Guess
  takeAGuess(name: String){
    this.quizGameloop.takeAGuess(name);
  }

}
