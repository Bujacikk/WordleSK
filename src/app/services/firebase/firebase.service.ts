import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }
  
  // Funkcia na získanie záznamu podľa kľúča
  getStringByKey(key: string): Observable<any> {
    return this.db.object('/' + key).valueChanges();
  }
}
