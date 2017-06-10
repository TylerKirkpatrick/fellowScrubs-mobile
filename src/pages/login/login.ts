import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';

/*
credit:
https://auth0.com/blog/ionic-2-authentication-how-to-secure-your-mobile-app-with-jwt/
*/

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

	email:any;
	password:any;

	constructor(
		public navCtrl: NavController, 
		private auth: AuthProvider,
		public alertCtrl: AlertController
	) {}

	login(FormLogin) {
		this.auth.login(FormLogin.value).subscribe(data => {
			if(data.success == true) {
				this.navCtrl.setRoot(TabsPage);
			} else {
				FormLogin.password = '';
				let alert = this.alertCtrl.create({
					title: 'Login Failed',
					subTitle: data.message,
					buttons: ['OK']
				});
				alert.present();
			}
		});
	}

}
