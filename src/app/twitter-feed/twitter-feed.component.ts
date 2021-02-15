import { Component, OnInit } from '@angular/core';
import { TwitterService } from '../services/twitter/twitter.service';

@Component({
  selector: 'app-twitter-feed',
  templateUrl: './twitter-feed.component.html',
  styleUrls: ['./twitter-feed.component.css']
})
export class TwitterFeedComponent implements OnInit {
  timeline: any;

  constructor(
    private service: TwitterService
  ) {}

  ngOnInit(): void {
    this.getTimeline();
  }

  getTimeline(): void {
    this.service.getTimeline()
      .subscribe(
        this.timeline => {
          this.timeline = timeline;
        }
      );
  }
}
