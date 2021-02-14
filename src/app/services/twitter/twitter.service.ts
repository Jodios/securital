import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  base_url = "https://api.twitter.com";
  oath_url = "/oauth/request_token";

  constructor(private http: HttpClient) { 
    
  }

  public login(){
    return this.http.post(this.base_url+this.oath_url, {});
  }

}
