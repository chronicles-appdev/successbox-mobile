import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api.service';
import { ProcessService } from 'src/app/services/process.service';

@Component({
  selector: 'app-cbt-result',
  templateUrl: './cbt-result.page.html',
  styleUrls: ['./cbt-result.page.scss'],
})
export class CbtResultPage implements OnInit {

  authToken!: any;
  scoreData: any=[];
  tt_id!: any
  total: any
  constructor(private processService: ProcessService, private route: Router, private routeAct: ActivatedRoute, private apiService: ApiServiceService) {}

  ngOnInit() {
      this.authToken = localStorage.getItem('token')
     this.routeAct.params.subscribe(params => {

      if(this.routeAct){
        this.tt_id = this.routeAct.snapshot.paramMap.get('id')
      }

     });

    this.getScore(this.tt_id)
  }


  getScore(tt_id: any){



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/assessment-score/'+tt_id, headers).subscribe({
        next: (data) => {
            // Do something with the response data here
          if (data.status == 'success') {
            this.scoreData = data.data

          this.total = (this.scoreData.correctly_answered * 100)/this.scoreData.total_questions
              console.log('Score Data successfully Fetched:', this.scoreData);
          } else {
             console.log(data.message);
          }
        },
        error: (error) => {
          console.error('Error Fetching Subject details:', error);
        }
      });


  }

}
