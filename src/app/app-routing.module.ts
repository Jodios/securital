import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { TweetComponent } from './tweet/tweet.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  // {path: "tweet", component: TweetComponent},
  {path: "onboard", component: OnboardingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
