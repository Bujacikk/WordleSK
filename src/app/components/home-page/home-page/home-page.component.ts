import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/interfaces/games.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  gamesArray: Game[] = [
    { url: '../assets/wordleSK_logo.png', name: 'Wordle SK', route: '/wordle'},
    { url: '../assets/F1champs_logo.png', name: 'F1 Quiz', route: '/f1champs'}
  ];

  ngOnInit(): void {
  }

}
