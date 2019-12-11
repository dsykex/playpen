import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from '../firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: any = {};
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    this.authService.getUserInfo().then(userInfo => {
      if(!userInfo)
        this.router.navigateByUrl('/')
      else
        this.user = userInfo;
    })
    
    //TODO

  }

  
}
