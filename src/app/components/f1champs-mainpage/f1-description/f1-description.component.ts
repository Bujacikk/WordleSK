import { Component, OnInit } from '@angular/core';
import { QuizGameloopService } from 'src/app/services/F1champs/quiz-gameloop.service';

@Component({
  selector: 'app-f1-description',
  templateUrl: './f1-description.component.html',
  styleUrls: ['./f1-description.component.scss']
})
export class F1DescriptionComponent implements OnInit {

  constructor(private quizGameloop: QuizGameloopService) { }

  // Desciption
  description: string = "Uhádni šampión!";

  ngOnInit(): void {
    this.quizGameloop.observableDescription.subscribe(x =>
      this.description = x);
  }

}
