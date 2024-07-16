import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialogModule } from '@angular/material/dialog';
import { PopUpComponent } from './components/WordleSKcomponents/pop-up/pop-up.component';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './components/header/header/header.component';
import { KeyboardComponent } from './components/keyboard/keyboard/keyboard.component';
import { MatrixComponent } from './components/matrix/matrix/matrix.component';
import { WordleMainpageComponent } from './components/WordleSKcomponents/wordle-mainpage/wordle-mainpage.component';
import { F1champsMainComponent } from './components/f1champs-mainpage/f1champs-main/f1champs-main.component';
import { HomePageComponent } from './components/home-page/home-page/home-page.component';
import { FinalPopUpComponent } from './components/f1champs-mainpage/final-pop-up/final-pop-up.component';
import { F1ChoicesComponent } from './components/f1champs-mainpage/f1-choices/f1-choices.component';
import { F1ScoreComponent } from './components/f1champs-mainpage/f1-score/f1-score.component';
import { F1DescriptionComponent } from './components/f1champs-mainpage/f1-description/f1-description.component';
import { F1ImageComponent } from './components/f1champs-mainpage/f1-image/f1-image.component';

@NgModule({
  declarations: [
    AppComponent,
    PopUpComponent,
    HeaderComponent,
    KeyboardComponent,
    MatrixComponent,
    WordleMainpageComponent,
    F1champsMainComponent,
    HomePageComponent,
    FinalPopUpComponent,
    F1ChoicesComponent,
    F1ScoreComponent,
    F1DescriptionComponent,
    F1ImageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSlideToggleModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Your config
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  
}
