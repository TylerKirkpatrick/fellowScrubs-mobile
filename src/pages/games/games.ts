import { ProfilePage } from './../profile/profile';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GamesService } from '../../app/services/hymndb.service';
import { DetailsPage } from '../details/details';
import { LoginPage } from '../login/login';

@Component({
  selector: 'games',
  templateUrl: 'games.html'
})
export class GamesPage {
  items: any;

  constructor(public navCtrl: NavController, private gamesService: GamesService, private auth: AuthProvider) {

  }

  ngOnInit() {
    if(this.auth.isLogged()) {
      this.getGames();
    }
    
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

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

}
