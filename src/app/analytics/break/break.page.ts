import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api.service';

@Component({
  selector: 'app-break',
  templateUrl: './break.page.html',
  styleUrls: ['./break.page.scss'],
})
export class BreakPage implements OnInit {
  reportsData: any[] = [];
    reportData: any = [];
  authToken: any
  catId: any
  total: any
  public pieChartLabels = [ 'Test Failed', 'Test Passed'];
  public pieChartData = [0, 0];
    public pieChartDatasets = [ {
    data: [ 0, 0]
    }];


constructor(private route: Router, private routeAct: ActivatedRoute, private apiService: ApiServiceService) {}

  ngOnInit() {
      this.authToken = localStorage.getItem('token')
     this.routeAct.params.subscribe(params => {

      if(this.routeAct){
        this.catId = this.routeAct.snapshot.paramMap.get('id')
      }

     });
    // this.getCategories()
    this.getreport(this.catId)


  }



  getreport(catId: any): any{



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/user-assess-record-category/'+catId, headers).subscribe({
        next: (data) => {

          if (data.status == 'success') {

             this.reportsData = data.data
             console.log('Hi this is ssce',this.reportsData);
          } else {

             console.log(data.message);
          }
        },
        error: (error) => {

          console.error('Error Fetching analytics details:', error);
        }
      });


  }

}
