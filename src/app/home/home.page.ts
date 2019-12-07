import { Component, OnInit } from '@angular/core';
import {GoogleNearby} from '@ionic-native/google-nearby/ngx'
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  public nearby: any;
  public error: any;

  constructor(private googleNearby: GoogleNearby, public authService: AuthService) {

  }

  ngOnInit()
  {
    this.authService.getUserInfo().then(uInfo => {
      console.log(uInfo);
    })
  }
}
