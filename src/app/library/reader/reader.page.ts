import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SubjTopicResponse, SubjTopic } from 'src/app/model/test.model';
import { ApiServiceService } from 'src/app/services/api.service';
import { ProcessService } from 'src/app/services/process.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss'],
})

export class ReaderPage implements OnInit {

topic_id!: any;
  subject_id!: any
  authToken!: any;
  contentData: any = [];
dataRaw: any = []
  headData: any=[]

  constructor(private processService: ProcessService,
    private loadingCtrl: LoadingController, private routeAct: ActivatedRoute,private router: Router, private apiService: ApiServiceService,) {

   }

  ngOnInit() {
      this.authToken = localStorage.getItem('token')
      this.routeAct.params.subscribe(params => {

      if(this.routeAct){

        this.topic_id = this.routeAct.snapshot.paramMap.get('id')
      }
         this.processService.updateBooks();

        this.getContent(this.topic_id)
        this.getSubjTopic(this.topic_id)


      });

  }


  handleRefresh(event: any) {
     setTimeout(() => {
            this.getContent(this.topic_id)
        this.getSubjTopic(this.topic_id)
          event.target.complete();
    }, 2000);
  }



  check(an: any) {

    if (an === 0) {

    } else {
      this.router.navigateByUrl('/tabs/test/'+ this.topic_id)
  }
}
  async getContent(topic_id: any){

     const loading = await this.loadingCtrl.create({message: 'Login.....'});
    await loading.present();


    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/content/topic/'+topic_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Content successfully Fetched:', data);
            this.contentData = data.content
              this.dataRaw = data

           loading.dismiss();


          } else {
              loading.dismiss();
              console.log(data.message);
            }
        },
        error: (error) => {
            console.log('Hi 3')
          console.error('Error Fetching Content:', error);
        }
      });


  }


  getSubjTopic(topic_id: any){



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

  //  console.log(headers)
      this.apiService.get('api/user/subject-details/topic/'+topic_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {

            this.headData = data.data[0]
            //  console.log('Head Data successfully Fetched:', this.headData);
            this.subject_id = this.headData.id


          } else {

              console.log(data.message);
            }
        },
        error: (error) => {
          //  console.log('Hi 3')
          console.error('Error Fetching Subject details:', error);
        }
      });


  }

}
