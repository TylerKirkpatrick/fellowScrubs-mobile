import { ProfilePage } from './../profile/profile';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamesService } from '../../app/services/hymndb.service';
import { PostPagePage } from '../post-page/post-page';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'details.html'
})
export class DetailsPage {
	item: any;
	posts: any;
	newPost: any;
	loggedIn: any;
	showNewPostText: any;
	currentPage: number;

	constructor(
	public navCtrl: NavController, 
	public params: NavParams, 
	private gamesService: GamesService, 
	private auth: AuthProvider, 
	private alertCtrl: AlertController) {
		this.showNewPostText = false;
		if(this.auth.isLogged() == true) {
			this.loggedIn = true;
		} else {
			this.loggedIn = false;
		}
		this.item = params.get('item');
		this.goToPage(1);
		
	}

	goToPage(which_page) {
		this.currentPage = which_page;
		this.gamesService.getPosts(this.item.game_endpoint, this.currentPage).subscribe(res => {
			
			this.posts = res.posts;
			//console.log("POSTS: ", JSON.stringify(this.posts.posts));
		});
	}

	ViewSinglePage(post) {
		this.gamesService.getSinglePost(post).subscribe(res => {
			this.posts = res;
		});
	}

	viewItem(item) {
		this.navCtrl.push(PostPagePage, {
			item: item
		});
	}

	addPost(post) {

		//console.log("THIS.ITEM: ", this.item.game_endpoint);

		const username = window.localStorage.getItem('username');

		//console.log("NEWBODY: ", newBody);

		var newBody = {
			title: post.title,
			text: post.text,
			game: {
				game_endpoint: this.item.game_endpoint
			},
			author: username
		}

		//console.log("NEWBODY: ", newBody);

		//console.log("SENDING: ", newBody);

		this.auth.addPost(newBody).subscribe(data => {
			//console.log("ADDED POST: ", data);
			//console.log("DATA: ", data);
			if(data.message == "Must wait at least 5 minutes between posts") {
				this.alertCtrl.create({
				title: 'Uh Oh!',
				subTitle: 'Must wait at least 5 minutes between posts!',
				buttons: [
					{
						text: 'OK',
						handler: data => {
							this.toggleNewPost();
						}
					}
				],
				}).present();
			}
			
			else if(data.success == true) {
				//this.navCtrl.pop(this.navCtrl.last().instance);
				console.log("POSTS: ", this.posts);
				this.posts.push(newBody);
				
			} else {
				this.alertCtrl.create({
				title: 'Uh Oh!',
				subTitle: 'Could not process your request',
				buttons: ['OK']
				}).present();
			
			}
		});
		
	}

	toggleNewPost() {
		this.showNewPostText = !this.showNewPostText;
	}

	goToProfile() {
    	this.navCtrl.push(ProfilePage);
  	}



}
