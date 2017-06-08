import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class GamesService {
	http: any;
	baseUrl: String;

	constructor(http: Http) {
		this.http = http;
		this.baseUrl = 'http://ec2-52-32-91-104.us-west-2.compute.amazonaws.com';
	}

	getGames() {
		return this.http.get(this.baseUrl + '/games')
		.map(res => res.json());
	}
}