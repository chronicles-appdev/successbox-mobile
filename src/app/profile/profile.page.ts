import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 firstname: string | null = ''
  lastname: string | null =''
  constructor(private router: Router,private alertController: AlertController) { }

  ngOnInit() {
     this.firstname = localStorage.getItem('firstname')
    this.lastname = localStorage.getItem('lastname')
    //this.class_id = localStorage.getItem('classid')
  }


  logOut() {

    sessionStorage.clear()
    localStorage.clear();
    this.router.navigateByUrl('/login');


  }
    async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Are sure you want to LogOut ?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',

        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
           this.logOut()


          }
        },
      ],
    });

    await alert.present();
  }

}
