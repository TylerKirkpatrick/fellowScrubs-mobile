import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamesService } from '../../app/services/hymndb.service';

@Component({
  templateUrl: 'post-page.html'
})
export class PostPagePage {
	item: any;
	posts: any;
	currentPage: number;

	constructor(public navCtrl: NavController, public params: NavParams, private gamesService: GamesService) {
		this.item = params.get('item');
		console.log(this.item);
			
	}

	reply() {
		console.log("replied");
	}

	

	



}
