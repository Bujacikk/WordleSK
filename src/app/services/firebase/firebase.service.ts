import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }
  
  // Funkcia na získanie záznamu podľa kľúča
  getStringByKey(key: string): Observable<any> {
    return this.db.object('/' + key).valueChanges();
  }

  // Funkcia na overenie, či slovo existuje v databáze
  wordExists(word: string): Observable<boolean> {
    return this.db.list('/').valueChanges().pipe(
      map((words: any[]) => words.includes(word))
    );
  }
}
