import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  baseUrl:string = "http://ec2-52-32-91-104.us-west-2.compute.amazonaws.com";

  constructor(public http: Http) {
    console.log('Hello AuthProvider Provider');
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', window.localStorage.getItem('token'));
  }

  private() {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(this.baseUrl+ '/users/authenticate', {
      headers: headers
    }).map(res => res.json());
  }

  login(data) {
    return this.http.post(this.baseUrl+'/users/authenticate', data)
    .map(this.extractData);
  }

  isLogged() {
    if(window.localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    window.localStorage.removeItem('token');
  }

  private extractData(res: Response) {
    let body = res.json();
    if(body.success == true) {
      window.localStorage.setItem('token', body.token);
    };

    return body || {};
  }

  register(data) {
    return this.http.post(this.baseUrl+'/users/register', data)
    .map(this.extractData);
  }

  getProfile() {
    if(this.isLogged()) {
      let headers = new Headers();
      const token = window.localStorage.getItem('token');
      headers.append('Authorization', token);
      headers.append('Content-Type','application/json');
      return this.http.get(`${this.baseUrl}/users/profile`, {headers: headers})
        .map(res => res.json());

    }

  }

  addComment(post, comment) {
    let headers = new Headers();
    const token = window.localStorage.getItem('token');
    headers.append('Authorization', token);
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl + `/games/${post.game.game_endpoint}/posts/${post._id}/comments`, comment, {headers: headers})
      .map(res => res.json());
  }

  addPost(post) {
    let headers = new Headers();
    const token = window.localStorage.getItem('token');
    headers.append('Authorization', token);
    headers.append('Content-Type','application/json');
    return this.http.post(this.baseUrl + `/games/${post.game.game_endpoint}/posts`, post, {headers: headers})
      .map(res => res.json());
  }

}
