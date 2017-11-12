import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from '../models/user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private BASE_URL: string = 'https://cshomeworkapi.azurewebsites.net/api';

  createHeader = () => {
    return new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, accept',
    });
  }

  constructor(
    private http: Http) {}

  login(user: User): Promise<any> {
    const url: string = `${ this.BASE_URL }/login`;
    const headers = this.createHeader();

    return this.http.post(url, user, {headers: headers}).toPromise();
  }

  register(user: User): Promise<any> {
    const url: string = `${ this.BASE_URL }/register`;
    const headers = this.createHeader();

    return this.http.post(url, user, {headers: headers}).toPromise();
  }

  ensureAuthenticated(token): Promise<any> {
    const url: string = `${ this.BASE_URL }/status`;
    const headers = this.createHeader();

    return this.http.get(url, {headers: headers}).toPromise();
  }

  get(route: string): Promise<any> {
    const token = localStorage.getItem('token');
    const url: string = `${ this.BASE_URL }/${ route }`;
    const headers = this.createHeader();
    headers.append('Authorization', `Bearer ${ token }`);

    return this.http.get(url, {headers: headers}).toPromise();
  }

  post(route: string, data: any): Promise<any> {
    const token = localStorage.getItem('token');
    const url: string = `${ this.BASE_URL }/${ route }`;
    const headers = this.createHeader();
    headers.append('Authorization', `Bearer ${ token }`);

    return this.http.post(url, data, {headers: headers}).toPromise();
  }

}
