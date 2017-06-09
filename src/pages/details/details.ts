import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamesService } from '../../app/services/hymndb.service';
import { PostPagePage } from '../post-page/post-page';

@Component({
  templateUrl: 'details.html'
})
export class DetailsPage {
	item: any;
	posts: any;
	currentPage: number;

	constructor(public navCtrl: NavController, public params: NavParams, private gamesService: GamesService) {
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
			
			console.log(res);
			this.posts = res;
		});
	}

	viewItem(item) {
		this.navCtrl.push(PostPagePage, {
		item: item
		});
	}



}
