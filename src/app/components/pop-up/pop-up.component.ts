import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GameLoopService } from 'src/app/services/gameloop/game-loop.service';
import { WordEditingService } from 'src/app/services/word-editing/word-editing.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  constructor(
    private dialogRed: MatDialogRef<PopUpComponent>,
    private wordEditingService: WordEditingService,
    private gameloop: GameLoopService,
  ) { }

  word: string = ''
  textResult = ''
  value: any;

  diff: boolean = false

  ngOnInit(): void {
    this.word = this.wordEditingService.getWord();
    this.sentResult(this.gameloop.getIsEnded());
  }

  onClose(): void {
    this.dialogRed.close();
    this.gameloop.resetGame();
  }

  sentResult(isEnded: boolean): void {
    if (isEnded) this.textResult = "Gratulujem";
    else this.textResult = "Bohužial";
  }


}
