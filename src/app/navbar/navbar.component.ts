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
  isLoggedIn = this.twitterService.isLoggedIn();

  constructor(private twitterService: TwitterService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.twitterService.login().toPromise().then(x => {
      window.location.href=this.redirectURL+x["oauth_token"];
    }).then(() => {
      this.isLoggedIn = true;
    })
  }

  logout(){
    localStorage.removeItem("userAuth");
    this.isLoggedIn = false;
    this.router.navigate(["/"]);
  }



}
