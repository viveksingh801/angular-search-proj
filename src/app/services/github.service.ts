import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  url : string = "https://api.github.com/users/";

  constructor(private http : HttpClient) { }

  getUser(username : string){
    //https://api.github.com/users/username

    return this.http.get(this.url + username);

  }
}
