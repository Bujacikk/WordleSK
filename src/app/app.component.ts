import { Component } from '@angular/core';
import { WordEditingService } from './services/word-editing/word-editing.service'
import { FirebaseService } from './services/firebase/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private wordEditingService: WordEditingService,
    private firebaseService: FirebaseService
  ) { }
  //wordToCheck = 'BEDÁR\n';
  //wordExists = true;

  ngOnInit(): void {
    this.wordEditingService.getValueByKey(this.wordEditingService.generateRandomNumber().toString());
    
    /*this.firebaseService.wordExists(this.wordToCheck).subscribe(exists => {
      this.wordExists = exists;
      console.log(`Slovo ${this.wordToCheck} ${exists ? 'existuje' : 'neexistuje'} v databáze.`);
    });*/
  }

}

