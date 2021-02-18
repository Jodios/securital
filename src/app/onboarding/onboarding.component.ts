import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypingDNAService } from '../services/typingDNA/typing-dna.service';

declare var TypingDNA: any;

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  promptIndex = 0;
  prompts = [
    "A favorite copy set by writing teachers for their pupils is the following, because it contains every letter of the alphabet: A quick brown fox jumps over the lazy dog.",
    "Shoot for the moon, even if you miss, you'll land among the stars.",
    "Money is a strange business. People who haven't got it aim it strongly. People who have are full of troubles."
  ];
  currentPrompt = "";
  tdna: any;
  userInput: string;

  constructor(private tdnaService: TypingDNAService, private router: Router) { 

  }

  ngOnInit(): void {
  }

  verify() {
    this.promptIndex++;
    if (!this.tdna) alert("You haven't typed anything yet!");
    let l = this.userInput.length;
    let p = this.tdna.getTypingPattern({type:0, length:l});
    this.tdnaService.auto(
      JSON.parse(localStorage.getItem("userAuth"))["screen_name"],
      p
    ).toPromise().then((r) => {

                console.log(r);
      this.tdna.reset();
      this.userInput = "";
      if (this.promptIndex == 3) {
        this.router.navigate(["/tweet"]);
      }
    });

  }

  startRecording() {
    if (!this.tdna) {
      console.log("making new tdna");
      this.tdna = new TypingDNA();
    } else {
      console.log("starting recording");
      this.tdna.start();
    }
  }

  pauseRecording() {
    console.log("pausing recording");
    if (this.tdna) this.tdna.stop();
  }
}
