import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GamesService } from '../../app/services/hymndb.service';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'games',
  templateUrl: 'games.html'
})
export class GamesPage {
  items: any;

  constructor(public navCtrl: NavController, private gamesService: GamesService) {

  }

  ngOnInit() {
    this.getGames();
  }

  getGames() {
    this.gamesService.getGames().subscribe(res => {
      this.items = res;
    });
  }

  viewItem(item) {
    this.navCtrl.push(DetailsPage, {
      item: item
    });
  }

}
