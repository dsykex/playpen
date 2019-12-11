import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as firebase from '../firebase';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: any = {};
  error: string = '';
  constructor(public alertCtrl: AlertController, public router: Router) { }

  ngOnInit() 
  {

  }

  login()
  {
    let db = firebase.default.firestore();
    let users = db.collection('users');

    firebase.default.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(()=>{
      users.where('email', '==', this.user.email).get().then(snap => {
        console.log(snap.docs[0]);
      })
    }, error => {});
  }

  async signup() {
    const alert = await this.alertCtrl.create({
      inputs: [
        {
          name: 'first_name',
          type: 'text',
          placeholder: 'First Name'
        },
        {
          name: 'last_name',
          type: 'text',
          placeholder: 'Last Name'
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },
        {
          name: 'conf_password',
          type: 'password',
          placeholder: 'Confirm Password'
        },
      ],
      buttons: [ 
        {
          text: 'Create Account',
          handler: (data) => {
            this.registerUser(data);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert'
        },
      ]
    });

    await alert.present();
  }

  registerUser(data: {})
  {
    if(data.first_name && data.last_name && data.email && data.password && data.conf_password)
    {
      if(data.password == data.conf_password)
      {
        let db = firebase.default.firestore();
        let users = db.collection('users');

        users.where('email', '==', data.email).get().then(snap => {
          if(snap.size > 0)
          {
            this.error = 'A user already exists with that email, please try again.'
            setTimeout(() => {
              this.error = '';
            }, 4000)
          }

          else {
            let newUser = {
              first_name: data.first_name,
              last_name: data.last_name,
              email: data.email,
              password: data.password,
              createdAt: Date.now(),
              rank: 'm'
            }

            firebase.default.auth().createUserWithEmailAndPassword(data.email, data.password).then(userAuthData => {
              users.add(newUser).then(u => {
                u.update({id: u.id}).then(() => {
                    this.router.navigateByUrl('/profile');
                  }, error => {

                  }).catch(error => {
                    this.error = error.code
                    setTimeout(() => {
                      this.error = '';
                    }, 4000)
                  })
                })
              }).catch(error => {
                this.error = error.code
                setTimeout(() => {
                  this.error = '';
                }, 4000)
              })
          }
        })
      }
      else{
        this.error = 'Passwords do not match, please try again.'
        setTimeout(() => {
          this.error = '';
        }, 4000)
      }
    }else
    {
      this.error = 'All fields are required. Please try again.'
      setTimeout(() => {
        this.error = '';
      }, 4000)
    }
  }

}
