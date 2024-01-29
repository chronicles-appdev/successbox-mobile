import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api.service';
@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.page.html',
  styleUrls: ['./weekly.page.scss'],
})
export class WeeklyPage implements OnInit {
 public pieChartLabels = ['Test Passed', 'Test Failed'];
  public pieChartData = [0, 0];
    public pieChartDatasets = [ {
    data: [ 0, 0]
    }];
  public barChartColors: any[] = [
    { backgroundColor: 'red' },
    { backgroundColor: 'green' },
  ]
  public pieChartType = 'pie';
  authToken!: any;
  reportData: any=[];
  tt_id!: any
  total: any
  constructor(private route: Router, private routeAct: ActivatedRoute, private apiService: ApiServiceService) {}

  ngOnInit() {
      this.authToken = localStorage.getItem('token')
     this.routeAct.params.subscribe(params => {

      if(this.routeAct){
        this.tt_id = this.routeAct.snapshot.paramMap.get('id')
      }

     });

    this.getreport()


  }


  getreport(){



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/user-test-record-report/', headers).subscribe({
        next: (data) => {
            // Do something with the response data here
          if (data.status == 'success') {
            this.reportData = data.data
              this.pieChartData = [ this.reportData.No_of_tests_failed, this.reportData.No_of_tests_passed];
                this.pieChartDatasets = [ {
                data: [ this.reportData.No_of_tests_failed, this.reportData.No_of_tests_passed ]
              } ];

          this.total = (this.reportData.correctly_answered * 100)/this.reportData.total_questions
              console.log('Report Data successfully Fetched:', this.reportData);
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
