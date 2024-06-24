import { Component, OnInit } from '@angular/core';
import { BoxPaintingService } from 'src/app/services/box-painting/box-painting.service';
import { GameLoopService } from 'src/app/services/gameloop/game-loop.service';

@Component({
  selector: 'app-matrix',
  templateUrl: './matrix.component.html',
  styleUrls: ['./matrix.component.scss']
})
export class MatrixComponent implements OnInit {

  constructor(private gameLoop: GameLoopService,
    private boxPainting: BoxPaintingService,
  ) { }

  ngOnInit(): void {
    this.resetColorForKeyboard();
  }

  matrix = this.gameLoop.getMatrix();
  isRowAnimated = this.boxPainting.getIsRowAnimated();

  // Resetuje/setuje defaultne farby pre klavesnicu
  public resetColorForKeyboard() {
    this.boxPainting.resetColorForKeyboard();
  }

  // Funkcia vrati na aku farbu sa ma zmenit policko
  public getColor(number: number): string {
    return this.boxPainting.getColor(number);
  }

  // Funkcia prechadza polom a vrati ake cislo je na kazdej pozicii
  public colorState(): number {
    return this.boxPainting.colorState();
  }

}
