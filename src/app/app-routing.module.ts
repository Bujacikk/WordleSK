import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordleMainpageComponent } from './components/WordleSKcomponents/wordle-mainpage/wordle-mainpage.component';
import { F1champsMainComponent } from './components/f1champs-mainpage/f1champs-main/f1champs-main.component';
import { HomePageComponent } from './components/home-page/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'wordle', component: WordleMainpageComponent },
  { path: 'f1champs', component: F1champsMainComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
