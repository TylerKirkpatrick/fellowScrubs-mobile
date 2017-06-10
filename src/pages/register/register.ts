import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

/*
credit:
https://auth0.com/blog/ionic-2-authentication-how-to-secure-your-mobile-app-with-jwt/
*/

@Component({
  selector: 'register',
  templateUrl: 'register.html'
})
export class RegisterPage {

	email:any;
  username: any;
	password:any;

	constructor(
		public navCtrl: NavController, 
		private auth: AuthProvider,
		public alertCtrl: AlertController
	) {}

	Register(FormRegister) {
		this.auth.register(FormRegister.value).subscribe(data => {
			if(data.success == true) {
				this.navCtrl.setRoot(LoginPage);
			} else {
				FormRegister.password = '';
				let alert = this.alertCtrl.create({
					title: 'Register failed',
					subTitle: data.message,
					buttons: ['OK']
				});
				alert.present();
			}
		});
	}

}