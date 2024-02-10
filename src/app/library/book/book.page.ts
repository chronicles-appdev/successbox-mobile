import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api.service';
import { ProcessService } from 'src/app/services/process.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  subject_id!: any;
  public progress = 0.4;
  authToken!: any;
  topicData: any[] = []
  topicData1: any[] = []
  topicData2: any[] = []
    topicProgress: any = 0
    subjectProgress: any = 0
  subjectData: any = [];

   selectedSegment: string = 'first';

  constructor(private route: Router, private routeAct: ActivatedRoute, private processService: ProcessService, private apiService: ApiServiceService) { }

  ngOnInit() {
      this.authToken = localStorage.getItem('token')
      this.routeAct.params.subscribe(params => {

      if(this.routeAct){

        this.subject_id = this.routeAct.snapshot.paramMap.get('id')
      }
        this.processService.books$.subscribe((data) => {

         this.processService.updateShelf();

            console.log('This is updated Books', data)
          this.getTopics(this.subject_id)
          this.getTopics1(this.subject_id)
             this.getTopics2(this.subject_id)
                this.getSubjectD(this.subject_id)
                this.getSubjectProgress(this.subject_id)
      });


       // this.getTopicProgress(1)

      });

  }


  handleRefresh(event: any) {
     setTimeout(() => {
              this.getTopics(this.subject_id)
                this.getSubjectD(this.subject_id)
                this.getSubjectProgress(this.subject_id)
          event.target.complete();
    }, 2000);
  }

  segmentChanged(event: any) {
    console.log('Segment changed', event.detail.value);
    // You can perform additional actions based on the selected segment
  }

  getTopics(subject_id: any){
    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/topic/subject/'+subject_id+'/1', headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Topics successfully Fetched:', data);
            this.topicData = data.data

            console.log(this.topicData)


          } else {
              console.log('Hi2')
              console.log(data.message);
            }
        },
        error: (error) => {
            console.log('Hi 3')
          console.error('Error Fetching Topics:', error);
        }
      });


  }


  getTopics1(subject_id: any){
    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/topic/subject/'+subject_id+'/2', headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Topics successfully Fetched:', data);
            this.topicData1 = data.data

            console.log(this.topicData)


          } else {
              console.log('Hi2')
              console.log(data.message);
            }
        },
        error: (error) => {
            console.log('Hi 3')
          console.error('Error Fetching Topics:', error);
        }
      });


  }



  getTopics2(subject_id: any){
    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/topic/subject/'+subject_id+'/3', headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Topics successfully Fetched:', data);
            this.topicData2 = data.data

            console.log(this.topicData)


          } else {
              console.log('Hi2')
              console.log(data.message);
            }
        },
        error: (error) => {
            console.log('Hi 3')
          console.error('Error Fetching Topics:', error);
        }
      });


  }


  async getTopicProgress(topic_id: any){

    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
    await  this.apiService.get('api/user/get-topic-progress/'+topic_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Topics Progress successfully Fetched:', data);
            this.topicProgress = data.data.completed_percentage

            return this.topicProgress


          } else {
            return  0
              console.log(data.message);
            }
        },
        error: (error) => {

          console.error('Error Fetching  Progress:', error);
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
              console.log('Subject progress',this.subjectProgress)


          } else {

              console.log(data.message);
            }
        },
        error: (error) => {

          console.error('Error Fetching  Progress:', error);
        }
      });


  }


  getSubjectD(subject_id: any){


    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/subject-details/subject/'+subject_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
             //  console.log('Subject detail successfully Fetched:', data);
            this.subjectData = data.data[0]

            console.log('Subject detail successfully Fetched:',this.subjectData)


          } else {

              console.log(data.message);
            }
        },
        error: (error) => {

          console.error('Error Fetching Subject detail:', error);
        }
      });


  }


  configTopicProg(id: any) {
    if (id !== null) {
      return '1'
    } else {
      return '0'
    }
  }
}
