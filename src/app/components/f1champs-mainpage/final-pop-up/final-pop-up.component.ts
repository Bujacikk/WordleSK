import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuizGameloopService } from 'src/app/services/F1champs/quiz-gameloop.service';

@Component({
  selector: 'app-final-pop-up',
  templateUrl: './final-pop-up.component.html',
  styleUrls: ['./final-pop-up.component.scss']
})
export class FinalPopUpComponent implements OnInit {

  constructor(private dialogRed: MatDialogRef<FinalPopUpComponent>,
    private quizGameloop: QuizGameloopService
  ) { }

  score: number = 0;

  ngOnInit(): void {
    this.score = this.quizGameloop.getScore();
  }

  onClose(): void {
    this.quizGameloop.resetGame();
    this.dialogRed.close();
  }
}
