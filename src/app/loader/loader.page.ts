import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { ApiServiceService } from '../services/api.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {
 paid: any = 'false'
  public progress = 0;
authToken: any
  constructor(private router: Router,  private apiService: ApiServiceService, private animationCtrl: AnimationController) {

  }


  ngOnInit() {

     this.authToken = localStorage.getItem('token')
     this.fetchStatus()
    setInterval(() => {
      this.progress += 0.01;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
      if (this.progress > 1) {
           this.router.navigateByUrl('/tabs/home');

        setTimeout(() => {
          this.progress = 0;
        }, 1000);
      }
    }, 50);
    // setTimeout(() => {


    //  this.router.navigateByUrl('/tabs/home');

    // }, 3000);
  }

fetchStatus(){
   // console.log('Hi')
    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });
      this.apiService.get('api/payment-status', headers).subscribe({
        next: (data) => {
          console.log(data)
            // Do something with the response data here
          if (data.status == 'success') {
            this.paid = 'true'
            localStorage.setItem('payStatus', 'true')
              // this.route.navigateByUrl('/tabs/home')
            console.log(data)
           console.log('status successfully Fetched:', data);
          } else {
              localStorage.setItem('payStatus', 'false')
              console.log(data.message);
            }
        },
        error: (error) => {
            localStorage.setItem('payStatus', 'false')
          console.error('Error Fetching:', error);

        }
      });


  }
}
