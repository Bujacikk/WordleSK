import { Component, HostListener, OnInit } from '@angular/core';
import { Champ } from 'src/app/interfaces/champs.interface';
import { QuizGameloopService } from 'src/app/services/F1champs/quiz-gameloop.service';

@Component({
  selector: 'app-f1-image',
  templateUrl: './f1-image.component.html',
  styleUrls: ['./f1-image.component.scss']
})
export class F1ImageComponent implements OnInit {

  // Guessed champ
  champGuess: Champ = { name: '', imageUrl: '', imageUrlSmall: '', description: '' };

  isMobileView: boolean = false;
  imgBackup = "";

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    //this.swapImages(); // Skontrolujte veľkosť okna pri zmene veľkosti
    
  }
/*
  swapImages() {
    if(window.innerWidth <= 1000)
    {
      this.imgBackup = this.champGuess.imageUrl.slice();
      console.log(this.imgBackup)
      this.champGuess.imageUrl = this.champGuess.imageUrlSmall.slice();
      this.champGuess.imageUrlSmall = this.imgBackup.slice();
    }
    else
    {
      this.champGuess.imageUrlSmall = this.champGuess.imageUrl.slice();
      this.champGuess.imageUrl = this.imgBackup.slice();
    }
  }*/

  ngOnInit(): void {

    this.quizGameloop.observableChamp.subscribe(x => 
      this.champGuess = x);

    this.champGuess = this.quizGameloop.getChamp();
  }

  constructor(private quizGameloop: QuizGameloopService) { }

}
