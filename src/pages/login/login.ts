import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import {AuthService} from "../../app/services/auth";

import {JwtHelper} from "angular2-jwt";
import {Storage} from "@ionic/storage";

/*
credit:
https://auth0.com/blog/ionic-2-authentication-how-to-secure-your-mobile-app-with-jwt/
*/

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

	private LOGIN_URL = "http://ec2-52-32-91-104.us-west-2.compute.amazonaws.com/authenticate";
  	private SIGNUP_URL = "http://ec2-52-32-91-104.us-west-2.compute.amazonaws.com/register";
	auth: AuthService;
	email:any;
	password:any;

	contentHeader = new Headers({"Content-Type": "application/json"});
	error: string;
	jwtHelper = new JwtHelper();
	user: string;

	// When the page loads, we want the Login segment to be selected
  	authType: string = "login";

	constructor(private http: Http, private storage: Storage) {
		this.auth = AuthService;

		storage.ready().then(() => {
		storage.get('profile').then(profile => {
			this.user = JSON.parse(profile);
		}).catch(console.log);
		});
	}

	authenticate(credentials) {
		this.authType == 'login' ? this.login(credentials) : this.signup(credentials);
	}

	login(credentials) {
		this.http.post(this.LOGIN_URL, JSON.stringify(credentials), { headers: this.contentHeader })
		.map(res => res.json())
		.subscribe(
			data => this.authSuccess(data.id_token),
			err => this.error = err
		);
	}

	signup(credentials) {
		this.http.post(this.SIGNUP_URL, JSON.stringify(credentials), { headers: this.contentHeader })
		.map(res => res.json())
		.subscribe(
			data => this.authSuccess(data.id_token),
			err => this.error = err
		);
	}

	logout() {
		this.storage.remove('token');
		this.user = null;
	}

	authSuccess(token) {
		this.error = null;
		this.storage.set('token', token);
		this.user = this.jwtHelper.decodeToken(token).username;
		this.storage.set('profile', this.user);
	}

}
