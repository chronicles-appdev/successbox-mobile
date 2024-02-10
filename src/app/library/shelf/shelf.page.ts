import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ApiServiceService } from 'src/app/services/api.service';
import { ProcessService } from 'src/app/services/process.service';

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.page.html',
  styleUrls: ['./shelf.page.scss'],
})
export class ShelfPage implements OnInit {
  authToken!: any
  class_id: any
  bookData: any[]= []
  searchData: any[]= []
  recentData: any[] = []
  iconRolled = false;


paid: string | null ='false'
  constructor(private processService: ProcessService, private route: Router, private routeAct: ActivatedRoute, private apiService: ApiServiceService,private alertController: AlertController) {
    //  setInterval(() => {
    //   this.onLoad();
    // }, 5000);
  }

  ngOnInit() {
    this.authToken = localStorage.getItem('token')
    this.class_id = localStorage.getItem('class_id')

      this.processService.shelf$.subscribe((data) => {
          this.processService.updateHome();
        console.log('This is updated Shelf', data)
            this.getSubjects(this.class_id)
          this.recentSubjects()
      });



  this.paid = localStorage.getItem('payStatus')
  }



  refreshPage() {
     this.authToken = localStorage.getItem('token')
    this.class_id = localStorage.getItem('class_id')

     this.paid = localStorage.getItem('payStatus')
  }
  ionViewWillEnter() {
  this.refreshPage();
}



  handleRefresh(event: any) {
     setTimeout(() => {
          this.getSubjects(this.class_id)
          this.recentSubjects()
          event.target.complete();
    }, 2000);
  }



  navigate(id: any) {
    this.route.navigateByUrl('book' + id);
  }

  onReload() {
    this.processService.updateHome();
       this.processService.updateShelf();
  }

    get chunkedRecentData() {
    const chunkSize = 3;
    const chunks = [];

    for (let i = 0; i < this.bookData.length; i += chunkSize) {
      chunks.push(this.bookData.slice(i, i + chunkSize));
    }

    return chunks;
    }


   onLoad() {

     this.iconRolled = !this.iconRolled;
    // this.onReload()
  }

  getSubjects(class_id: any){

    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

      this.apiService.get('api/user/subject/class/'+class_id, headers).subscribe({
        next: (data) => {
            console.log('Hi1')
            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Books successfully Fetched:', data);
            this.bookData = data.data

            console.log(this.bookData)


          } else {
              console.log('Hi2')
              console.log(data.message);
            }
        },
        error: (error) => {
            console.log('Hi 3')
          console.error('Error Fetching books:', error);
        }
      });


  }

  openBook(id: any, subj: any) {
    if (this.paid !== 'true') {
         const containsEnglishOrMath = /english|math/i.test(subj);
         if (containsEnglishOrMath) {
             this.route.navigateByUrl('/tabs/book/' + id)

          } else {
           this.presentAlert()
          }
    } else {
          this.route.navigateByUrl('/tabs/book/' + id)
      }

}


  recentSubjects(){

    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


      this.apiService.get('api/user/recent/subjects', headers).subscribe({
        next: (data) => {
           //console.log("enters")
            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Recent Books successfully Fetched:', data);
            this.recentData = data.data

            //console.log(this.bookData)


          } else {
             // console.log('Hi2')
              console.log(data.message);
            }
        },
        error: (error) => {
            console.log('Hi 3')
          console.error('Error Fetching recent books:', error);
        }
      });


  }


    async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Paid Users Only !!!',
      message: 'This Book is only available for Paid Users',
      subHeader: 'Only English and Math is available for FREE mode',
      cssClass: 'custom-alert',

    });

    await alert.present();
  }

}
