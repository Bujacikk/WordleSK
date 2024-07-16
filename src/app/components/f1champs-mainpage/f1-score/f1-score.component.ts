import { Component, OnInit } from '@angular/core';
import { QuizGameloopService } from 'src/app/services/F1champs/quiz-gameloop.service';

@Component({
  selector: 'app-f1-score',
  templateUrl: './f1-score.component.html',
  styleUrls: ['./f1-score.component.scss']
})
export class F1ScoreComponent implements OnInit {

  // Score
  score: number = 0;
  
  constructor(private quizGameloop: QuizGameloopService) { }

  ngOnInit(): void {
    this.quizGameloop.observableScore.subscribe(x => 
      this.score = x);

    this.score = this.quizGameloop.getScore();
  }

}
