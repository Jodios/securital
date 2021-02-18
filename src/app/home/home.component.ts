import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TwitterService } from '../services/twitter/twitter.service';
import { TypingDNAService } from '../services/typingDNA/typing-dna.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn:boolean = false;

  constructor(
    private twitterService: TwitterService, 
    private tdnaService: TypingDNAService,
    private route: ActivatedRoute, 
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      let oauthToken = params["oauth_token"];
      let oauthVerifier = params["oauth_verifier"];
      if (!oauthToken || !oauthVerifier) return;
      twitterService.getAccess(oauthToken, oauthVerifier).toPromise().then(async user => {
        localStorage.setItem("userAuth", JSON.stringify(user)); // store the user
        this.isLoggedIn = true;
        this.userIsOnboarded().then((res) => { // check if we're onboarded
          if (!res) {
            this.router.navigate(['/onboard']);// if onboarded, we tweet
          } 
        });

      }).catch(() => {
        alert("Uh oh! Something went oopies!");
        this.router.navigate(['/']);
      });
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.twitterService.isLoggedIn();
  }

  async userIsOnboarded(): Promise<boolean> {
    let res = false;
    await this.tdnaService.getUser(JSON.parse(localStorage.getItem("userAuth"))["screen_name"]).toPromise().then(r => {
      sessionStorage.setItem("typingDNAUser", JSON.stringify(r));
      res = (parseInt(r["count"]) >= 3);
    }).catch(e => {
      console.log(e);
    });
    return res;
  }
}