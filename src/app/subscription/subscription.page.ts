import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ApiServiceService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
firstname: string | null = ''
  lastname: string | null = ''
  authToken: string | null = ''
  paid: any = 'false'
  constructor(private apiService: ApiServiceService, private route: Router) { }

  ngOnInit() {

    this.authToken = localStorage.getItem('token')
     this.firstname = localStorage.getItem('firstname')
    this.lastname = localStorage.getItem('lastname')
    this.fetchStatus()
    // this.class_id = localStorage.getItem('classid')
  }

openUrl(url: string): void {
  window.open(url, '_blank');
}
  checkpay() {
    const check = localStorage.getItem('payStatus')
    if (check == 'true') {

      this.paid = 'true'
      this.route.navigateByUrl('/tabs/home')

    } else {
      console.log('false')
         this.route.navigateByUrl('/subscription')
    }
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




  async openCapacitorSite(url: any) {
   const uid = '/'+localStorage.getItem('userId')
  await Browser.open({ url: url+uid });
};
}
