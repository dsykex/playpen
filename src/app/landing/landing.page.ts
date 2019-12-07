import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.getUserInfo().then(userInfo => {
      console.log(userInfo);
    })
  }

}
