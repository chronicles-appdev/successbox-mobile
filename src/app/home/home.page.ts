import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../services/api.service';
import { register } from 'swiper/element/bundle';
import { ProcessService } from '../services/process.service';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  firstname: string | null = ''
  lastname: string | null =''
  loadNext: boolean  = false
  class_id!: string | null
  isActionSheetOpen = false;
  recentData: any[] = []
  quoteData: any[] = []
  authToken!: any
paid: string | null ='false'
   subjectProgress: any = 0
  subjectData: any = [];


  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  setOpen(isOpen: boolean) {
    this.isActionSheetOpen = isOpen;
  }

  constructor(private navCtrl: NavController,private location: Location, private router: Router, private apiService: ApiServiceService, private processService: ProcessService) {

  }


  ngOnInit() {
     this.refreshPage();

     setTimeout(() => {
       this.loadNext = true

    }, 1000);

  }

  ionViewWillEnter() {
    this.refreshPage();
       this.navCtrl.navigateForward('/tabs/home');

  }
  refreshPage() {


     this.authToken = localStorage.getItem('token')
    this.class_id = localStorage.getItem('class_id')
    this.firstname = localStorage.getItem('firstname')
    this.lastname = localStorage.getItem('lastname')
    this.paid = localStorage.getItem('payStatus')

    this.recentSubjects()
    this.quotesForToday()
      this.fetchStatus()
  }

   reloadPage() {
  this.location.replaceState(this.location.path()); // Reload the current route
  window.location.reload(); // Reload the page
   }

  handleRefresh(event: any) {
    this.navCtrl.pop().then(() => {
    this.navCtrl.navigateForward('/tabs/home');
  });
     setTimeout(() => {
        this.recentSubjects()
           this.quotesForToday()
        this.fetchStatus()
        this.paid = localStorage.getItem('payStatus')
          event.target.complete();
    }, 2000);
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

  recentSubjects(){




    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


      this.apiService.get('api/user/recent/subjects', headers).subscribe({
        next: (data) => {
           console.log("enters")
            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Recent Books successfully Fetched:', data);
             this.recentData = data.data

            console.log(this.recentData)

            this.getSubjectProgress(this.recentData[0].id)
          } else {
              console.log('Hi2')
              console.log(data.message);
            }
        },
        error: (error) => {
            console.log('Hi 3')
          console.error('Error Fetching recent books:', error);
        }
      });


  }


  quotesForToday(){
      const headers = new HttpHeaders({

            'Content-Type': 'application/json',
              Authorization: `Bearer ${this.authToken}`
      });
      this.apiService.get('api/user/quotes', headers).subscribe({
        next: (data) => {
         console.log(data)
            // Do something with the response data here
          if (data.status == 'success') {

             this.quoteData = data.data

            console.log(this.quoteData)
          } else {
            console.log(data.message);
          }
        },
        error: (error) => {
          console.error('Error Fetching recent quotes:', error);
        }
      });


  }


   getSubjectProgress(subject_id: any){

    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


      this.apiService.get('api/user/get-subject-progress/'+subject_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Subject Progress successfully Fetched:', data);
              this.subjectProgress = data.data.completed_percentage
              console.log(this.subjectProgress)


          } else {

              console.log(data.message);
            }
        },
        error: (error) => {

          console.error('Error Fetching  Progress:', error);
        }
      });


  }
}
