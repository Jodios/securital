import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwitterService } from '../services/twitter/twitter.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  redirectURL = "https://api.twitter.com/oauth/authenticate?oauth_token=";
  isLoggedIn = false;

  constructor(private twitterService: TwitterService, private router: Router) { 
    this.twitterService.loggedInObservable.subscribe(b => {
      this.isLoggedIn = b;
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.twitterService.login().toPromise().then(x => {
      window.location.href=this.redirectURL+x["oauth_token"];
    }).then(() => {
      this.twitterService.loggedInObservable.next(true);
    })
  }

  logout(){
    localStorage.removeItem("userAuth");
    this.twitterService.loggedInObservable.next(false);
    this.router.navigate(["/"]);
  }



}
