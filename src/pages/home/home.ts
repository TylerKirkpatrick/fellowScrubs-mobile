import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    if(!this.isLoggedIn()) {
      console.log("not logged in...");
      this.navCtrl.push(LoginPage);
    }
  }

  isLoggedIn() {
    if(window.localStorage.getItem('currentuser')) {
      return true;
    }
  }

}
