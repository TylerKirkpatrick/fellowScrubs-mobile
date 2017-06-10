import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { MomentModule } from 'angular2-moment';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile: any;
  myDate: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider) {
    this.auth.getProfile().subscribe(data => {
      console.log("profile: ", data);
      this.profile = data.user;

      this.myDate = new Date(this.profile.created);
    
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  logout() {
    this.auth.logout();
    this.navCtrl.push(LoginPage);
  }

}
