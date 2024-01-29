import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api.service';
import { ProcessService } from 'src/app/services/process.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
})
export class ScorePage implements OnInit {

  authToken!: any;
  scoreData: any=[];
   topic_id!: any
  constructor(private processService: ProcessService, private route: Router, private routeAct: ActivatedRoute, private apiService: ApiServiceService) {}

  ngOnInit() {
      this.authToken = localStorage.getItem('token')
     this.routeAct.params.subscribe(params => {

      if(this.routeAct){
        this.topic_id = this.routeAct.snapshot.paramMap.get('id')
      }

     });

    this.getScore(this.topic_id)
  }


  getScore(topic_id: any){



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/result-score/'+topic_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {

            this.scoreData = data.data
              console.log('Score Data successfully Fetched:', this.scoreData);



          } else {

              console.log(data.message);
            }
        },
        error: (error) => {
            console.log('Hi 3')
          console.error('Error Fetching Subject details:', error);
        }
      });


  }

}
