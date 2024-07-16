import { Component } from '@angular/core';
import { WordEditingService } from './services/WordleSK/word-editing/word-editing.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private wordEditingService: WordEditingService,
  ) { }


  ngOnInit(): void {
    this.wordEditingService.getValueByKey(this.wordEditingService.generateRandomNumber().toString());
  
  }

}

