import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { TwitterService } from './services/twitter/twitter.service';
import { TypingDNAService } from './services/typingDNA/typing-dna.service';
import { TweetComponent } from './tweet/tweet.component';
import { OnboardingComponent } from './onboarding/onboarding.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TweetComponent,
    OnboardingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    TwitterService,
    TypingDNAService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
