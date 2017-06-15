import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

	username: any;
	password: any;
	

	constructor(
		public navCtrl: NavController, 
		private auth: AuthProvider,
		public alertCtrl: AlertController
	) {}

	login(FormLogin) {		
		this.auth.login(FormLogin.value).subscribe(data => {
			if(data.success == true) {
				//console.log("setting username: ", FormLogin.username);
				window.localStorage.setItem('username', FormLogin.value.username);
				this.navCtrl.setRoot(TabsPage);
			} else {
				console.log("NOT SUCCESSFULL: ", data.success);
				FormLogin.password = '';
				let alert = this.alertCtrl.create({
					title: 'Login failed, try registering as a new user',
					subTitle: data.message,
					buttons: ['OK']
				});
				alert.present();
			}
		},
		(err) => {
			console.log("ERROR: ", err);
		},

		() => {
			console.log("completed");
		});
		
	}

	goToRegister() {
		this.navCtrl.push(RegisterPage);
	}

}
