import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuizGameloopService } from 'src/app/services/F1champs/quiz-gameloop.service';
import { FinalPopUpComponent } from 'src/app/components/f1champs-mainpage/final-pop-up/final-pop-up.component';

@Component({
  selector: 'app-f1champs-main',
  templateUrl: './f1champs-main.component.html',
  styleUrls: ['./f1champs-main.component.scss']
})
export class F1champsMainComponent implements OnInit {

  constructor(private quizGameloop: QuizGameloopService,
    private popUp: MatDialog
  ) { 
    this.checkView(); // Skontrolujte veľkosť okna pri načítaní komponentu
  }

  // RoundIsEnded
  isEndedRound = false;

  // QuizIsEnded
  isEnded = false;



  isMobileView: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkView(); // Skontrolujte veľkosť okna pri zmene veľkosti
  }

  checkView() {
    this.isMobileView = window.innerWidth < 1800; // Nastavte isMobileView na true, ak je šírka okna menšia ako 600 pixelov
    console.log(window.innerWidth);
  }
  



  nextChamp(){
    if(this.isEnded) this.popUp.open(FinalPopUpComponent);
    else this.quizGameloop.nextChamp();
  }

  ngOnInit(): void {
    this.quizGameloop.isEndedRound.subscribe(x =>
        this.isEndedRound = x);

    this.quizGameloop.isEnded.subscribe(x =>
        this.isEnded = x);

    this.quizGameloop.getGuessed();
  }



}
