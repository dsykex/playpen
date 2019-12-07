import { Component, OnInit } from '@angular/core';
import {GoogleNearby} from '@ionic-native/google-nearby/ngx'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public nearby: any;
  public error: any;

  constructor(private googleNearby: GoogleNearby) {

  }

  ngOnInit()
  {
    this.googleNearby.publish('Hello')
      .then((res: any) => console.log(res))
      .catch((error: any) => {
        this.error = error;
      });
    
    this.googleNearby.subscribe()
      .subscribe((res: any) => console.log(res), error => console.log(error), () => {});
  }
}
