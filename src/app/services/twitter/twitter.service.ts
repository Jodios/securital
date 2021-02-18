import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/**
 * Used to contact both our custom backend, and the Twitter API
 */

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  base_url = "http://192.53.165.83:30666";
  login_url = "/twitter/login";
  get_access_url = "/twitter/getAccess";
  post_tweet_url = "/twitter/postTweet";

  constructor(private http: HttpClient) {}

  public login(){
    let query = "?oauth_callback=" + encodeURIComponent(window.location.href);
    return this.http.post(this.base_url+this.login_url+query, {});
  }

  public getAccess(oauthToken: string, oauthVerifier: string) {
    return this.http.post(this.base_url+this.get_access_url,{
      oauth_token: oauthToken,
      oauth_verifier: oauthVerifier
    });
  }

  public postTweet(
    oauthToken: string, 
    oauthSecret: string, 
    userID: string, 
    screenName: string, 
    tweetText: string
    ) {
    return this.http.post(this.base_url+this.post_tweet_url, {
      oauth_token: oauthToken,
      oauth_token_secret: oauthSecret,
      user_id: userID,
      screen_name: screenName,
      tweet: tweetText
    });
  }
}
