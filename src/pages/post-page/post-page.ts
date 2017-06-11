import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamesService } from '../../app/services/hymndb.service';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';


@Component({
  templateUrl: 'post-page.html'
})
export class PostPagePage {
	item: any;
	username: any;
	replyOn: boolean;

	constructor(public navCtrl: NavController, public params: NavParams, private gamesService: GamesService, private auth: AuthProvider, private alertCtrl: AlertController) {
		this.item = params.get('item');
		this.replyOn = false;
		console.log("comments: ", this.item.comments);
			
	}

	reply(FormComment) {
		this.replyOn = true;

		this.username = window.localStorage.getItem('username');

		var newBody = {
			text: FormComment.comment,
			username: this.username
		}

		if(!this.auth.isLogged()) {
			this.alertCtrl.create({
				title: 'Uh Oh!',
				subTitle: 'Please login!',
				buttons: [
					{
						text: 'OK',
						handler: data => {
							this.navCtrl.push(LoginPage);
						}
					}
				],
			}).present();
		} else if(FormComment.comment == "" || FormComment.comment == null || FormComment.comment == " ") {
			this.alertCtrl.create({
				title: 'Uh Oh!',
				subTitle: 'Please enter text',
				buttons: [
					{
						text: 'OK',
						handler: data => {
							
						}
					}
				],
			}).present();
		} else {

			this.auth.addComment(this.item, newBody).subscribe(data => {
				//console.log("REPLIED: ", data);
				
				try {
					this.item.comments.push(newBody);
				} catch(e) {
					this.alertCtrl.create({
						title: 'Uh Oh!',
						subTitle: 'Something went wrong registering your comment!',
						buttons: [
							{
								text: 'OK',
								handler: data => {
									this.toggleReply();
								}
							}
						],
					}).present();
				}
				
				
			});
		}
	}

	toggleReply() {
		this.replyOn = !this.replyOn;
		
	}

	

	



}
