import { Component, OnInit } from '@angular/core';
import { GameLoopService } from '../../../services/gameloop/game-loop.service';
import { WordEditingService } from 'src/app/services/word-editing/word-editing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private gameLoop: GameLoopService,
    private wordEditingService: WordEditingService,
  ) { }

  ngOnInit(): void {
    this.gameLoop.isDisabled
      .subscribe(x => 
        this.isDisabled = x);
    this.gameLoop.isDifficultyHard
      .subscribe(x => 
        this.isDifficultyHard = x);
  }

  isDifficultyHard = true;
  isDisabled = false;

  // Slider meni obtiažnosť
  public changeStateOfSlide() {
    this.gameLoop.setIsDifficultyHard(!this.isDifficultyHard)
    if (this.isDifficultyHard == true) {
      // Hard
      this.wordEditingService.switchDiff("hard")
    }
    else {
      // Easy
      this.wordEditingService.switchDiff("easy")
    }
  }

  // Zavola pomocne pismeno
  public getHint(){
    this.gameLoop.getHint();
  }

}
