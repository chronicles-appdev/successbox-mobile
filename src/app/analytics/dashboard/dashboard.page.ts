import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/services/api.service';
import { register } from 'swiper/element/bundle';

register();
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 public pieChartLabels = [ 'Test Failed', 'Test Passed'];
  public pieChartData = [0, 0];
    public pieChartDatasets = [ {
    data: [ 0, 0]
    }];

  topSubject: any[] = []
  level = 0
  iconRolled: boolean = false
  //public pieChartType = 'pie';

catData: any[] = [];
  reportsData: any[] = [];

reportsData1: any[] = [];
reportsData2: any[] = [];
reportsData3: any[] = [];
  authToken!: any;
  reportData: any = [];

   catId: any
   catId1: any
  catId2: any

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
    // this.getCategories()



  }


  handleRefresh(event: any) {
     setTimeout(() => {
       
          event.target.complete();
    }, 2000);
  }


  selected(cat_id: any) {

    const selected = cat_id.target.value

    console.log(selected)
    if (selected == 1) {
      this.level = 1
       this.getreport(1)
      this.getUTME(1)
       this.getTopSubj()
    } else if (selected == 2) {
      this.level = 2
       this.getreport(2)
      this.getSSCE(2)
       this.getTopSubj()
    } else if (selected == 3) {
      this.level = 3
       this.getreport(3)
      this.getBECE(3)
       this.getTopSubj()
    }
  }


   onLoad() {

     this.iconRolled = !this.iconRolled;
    // this.onReload()
  }

  onReload() {
    this.ngOnInit()
  }
  getreport(cat_id: any){



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    // console.log('get Report')

      this.apiService.get('api/user/user-test-record-report/'+cat_id, headers).subscribe({
        next: (data) => {
          console.log('report:',data)
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
          console.error('Error Fetching Dashboard Data:', error);
        }
      });


  }


   getTopSubj(){
    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

      this.apiService.get('api/user/user-best-subjects', headers).subscribe({
        next: (data) => {

          if (data.status == 'success') {
            this.topSubject = data.data



            console.log('Top Subject Data successfully Fetched:', this.topSubject);


          } else {
             console.log(data.message);
          }
        },
        error: (error) => {
          console.error('Error Fetching Dashboard Data:', error);
        }
      });


  }


  getSSCE(catId: any): any{



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/user-assess-record-category/'+catId, headers).subscribe({
        next: (data) => {

          if (data.status == 'success') {

            this.reportsData = data.data
              this.reportsData = this.reportsData.slice(0, 5);
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

  getUTME(catId: any): any{

    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


      this.apiService.get('api/user/user-assess-record-category/'+catId, headers).subscribe({
        next: (data) => {

          if (data.status == 'success') {

            this.reportsData1 = data.data
              this.reportsData1 = this.reportsData1.slice(0, 5);

          } else {

             console.log(data.message);
          }
        },
        error: (error) => {

          console.error('Error Fetching analytics details:', error);
        }
      });


  }


  getBECE(catId: any): any{



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/user-assess-record-category/'+catId, headers).subscribe({
        next: (data) => {

          if (data.status == 'success') {

            this.reportsData2 = data.data
             this.reportsData2 = this.reportsData2.slice(0, 5);

          } else {

             console.log(data.message);
          }
        },
        error: (error) => {

          console.error('Error Fetching analytics details:', error);
        }
      });


  }

  getCategories(){




    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


      this.apiService.get('api/user/assessment-categories', headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Categories  successfully Fetched:', data);
            this.catData = data.data

               this.catId = this.catData[0].id
               this.catId1 = this.catData[1].id
              this.catId2 = this.catData[2].id
          //   this.getSSCE(this.catId)
          //  this.getUTME(this.catId1)
          //   this.getBECE(this.catId2)




          } else {

              console.log(data.message);
            }
        },
        error: (error) => {

          console.error('Error Fetching Categories:', error);
        }
      });


  }

}
