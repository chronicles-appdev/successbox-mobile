import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { Clipboard } from '@capacitor/clipboard';
import { HttpHeaders } from '@angular/common/http';
import { ApiServiceService } from '../services/api.service';
const { Storage } = Plugins;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 firstname: string | null = ''
  lastname: string | null = ''
  authToken!: string | null;
   @ViewChild('popover') popover: any;
  profile: any= []
  isOpen = false;
  constructor(private router: Router,private alertController: AlertController, private apiService: ApiServiceService) { }

  ngOnInit() {
     this.firstname = localStorage.getItem('firstname')
    this.lastname = localStorage.getItem('lastname')
    this.authToken = localStorage.getItem('token')

    this.getProfile()
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  refreshPage() {

    this.firstname = localStorage.getItem('firstname')
    this.lastname = localStorage.getItem('lastname')
  }
  ionViewWillEnter() {
  this.refreshPage();
}


  async copy(ev: any, data: string) {
     await Clipboard.write({
    string: data + this.profile.referal_code
     });
     this.presentPopover(ev)

  }
  logOut() {

    sessionStorage.clear()
    localStorage.clear();
    this.router.navigateByUrl('/login');


  }

  getProfile(){
    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


      this.apiService.get('api/auth/user/profile', headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {

            this.profile = data.data
            console.log('Profile successfully Fetched:', this.profile);
          }
        },
        error: (error) => {

          console.error('Error Fetching Topics:', error);
        }
      });


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
