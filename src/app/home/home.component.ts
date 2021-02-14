import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TwitterService } from '../services/twitter/twitter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  twitterKey = environment.twitterKey;

  constructor(private twitterService: TwitterService) { }

  ngOnInit(): void {
  }

  login(){
    this.twitterService.login().subscribe(x => {
      console.log(x);
    })
  }

}
