import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Clipboard } from '@capacitor/clipboard';
import { ApiServiceService } from '../services/api.service';
@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  profile: any = []
  firstname: string | null = ''
  lastname: string | null = ''
  authToken!: string | null;
  successPoint = 0
  userId!: string | null
  successHostory: any[] = []

   @ViewChild('popover') popover: any;
  isOpen = false;
  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
     this.firstname = localStorage.getItem('firstname')
    this.lastname = localStorage.getItem('lastname')
    this.authToken = localStorage.getItem('token')
     this.userId = localStorage.getItem('userId')
    this.getProfile()
    this.fetchHistory()
    this.fetchPoint()
  }


  async copy(ev: any, data: string) {
     await Clipboard.write({
    string: this.profile.referal_code
     });
     this.presentPopover(ev)
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  fetchPoint(){
      const headers = new HttpHeaders({
            'Content-Type': 'application/json',
              Authorization: `Bearer ${this.authToken}`
      });
        this.apiService.get('api/user/fetch-success-points/'+this.userId, headers).subscribe({
          next: (data) => {

            if (data.status == 'success') {
                console.log('success points', data)
                this.successPoint = data.data
            }
          },
          error: (error) => {
            console.error('Error Fetching:', error);
          }
        });


  }


  fetchHistory(){
      const headers = new HttpHeaders({
            'Content-Type': 'application/json',
              Authorization: `Bearer ${this.authToken}`
      });
        this.apiService.get('api/user/fetch-points-history/'+this.userId, headers).subscribe({
          next: (data) => {
            if (data.status == 'success') {
              console.log('History:', data.data)
                this.successHostory = data.data
            }
          },
          error: (error) => {
            console.error('Error Fetching:', error);
          }
        });
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
          }
        },
        error: (error) => {
          console.error('Error Fetching Topics:', error);
        }
      });
  }
}
