import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamesService } from '../../app/services/hymndb.service';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  templateUrl: 'post-page.html'
})
export class PostPagePage {
	item: any;
	username: any;
	replyOn: boolean;

	constructor(public navCtrl: NavController, public params: NavParams, private gamesService: GamesService, private auth: AuthProvider) {
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

		this.auth.addComment(this.item, newBody).subscribe(data => {
			console.log("REPLIED: ", data);
		});
	}

	toggleReply() {
		if(this.replyOn == true) {
			this.replyOn = false;
		} else {
			this.replyOn = true;
		}
		
	}

	

	



}
