import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamesService } from '../../app/services/hymndb.service';

@Component({
  templateUrl: 'details.html'
})
export class DetailsPage {
	item: any;
	posts: any;
	constructor(public navCtrl: NavController, public params: NavParams, private gamesService: GamesService) {
		this.item = params.get('item');
		this.gamesService.getPosts(this.item.game_endpoint, 1).subscribe(res => {
			
			this.posts = res.posts;
			//console.log("POSTS: ", JSON.stringify(this.posts.posts));
		});;
		
	}

}
