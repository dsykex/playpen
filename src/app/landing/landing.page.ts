import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from '../firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.authService.getUserInfo().then(userInfo => {
      console.log(userInfo);
      if(userInfo)
      {
        this.router.navigateByUrl('/profile');
      }
      else
      {
        this.router.navigateByUrl('/login');
      }
    })
  }

}
