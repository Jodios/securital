import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TwitterService } from '../services/twitter/twitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  redirectURL = "https://api.twitter.com/oauth/authenticate?oauth_token=";

  constructor(private twitterService: TwitterService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      let oauthToken = params["oauth_token"];
      let oauthVerifier = params["oauth_verifier"];
      if (!oauthToken || !oauthVerifier) return;
      twitterService.getAccess(oauthToken, oauthVerifier).toPromise().then(user => {
        localStorage.setItem("userAuth", JSON.stringify(user));
        
      }).catch(() => {
        alert("Uh oh! Something went oopies!");
      }).finally(() => {
        this.router.navigate([`/`]);
      });
    });
  }

  ngOnInit(): void {

  }

  login() {
    window.location.href = this.redirectURL + "Wmb7HAAAAAABMx8hAAABd6516MY";

    // this.twitterService.login().subscribe(x => {
    //   window.location.href=this.redirectURL+x["oauth_token"];
    // });
  }

}
