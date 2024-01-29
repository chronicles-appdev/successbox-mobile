import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api.service';
@Component({
  selector: 'app-leader',
  templateUrl: './leader.page.html',
  styleUrls: ['./leader.page.scss'],
})
export class LeaderPage implements OnInit {
  iconRolled: boolean = false
  show: boolean = false
  showCat: boolean = false
  showSubEx: boolean = false
  showAss: boolean = false
   showSub: boolean = false
  userId: string | null = ''
  classId: string | null = ''
  leaderData: any[] = []
  authToken: any
  cat: string = ''
  topSubject: any[] = []
  topSubject1: any[] = []
  topSubject2: any[] = []
  topSubject3: any[] = []
  subjectData: any[] = []
  subjectDataEx: any[] = []
  constructor(private apiService: ApiServiceService) { }

  handleChange(e: any) {
     const data = e.detail.value
    console.log('ionChange fired with value: ' + data);
    if (data === 'assessment') {
      // this.show = true
      this.showCat = true
      this.showSub = false
      this.showSubEx = false
    } else {

      this.getSubjects(this.classId)
      //  this.show = true
      this.showCat = false
      this.showSub = true
      this.showSubEx = false

      // this.getStudy(classId)

    }

  }

  handleChangeSubj(e: any) {
     const data = e.detail.value
    console.log('ionChange fired with subject ID: ' + data);

      this.getStudy(this.classId, data)
      this.showSub = true


  }


  handleChangeSubjEx(e: any) {
     const data = e.detail.value
    console.log('ionChange fired with subject ID: ' + data);

      this.getPractRanking(this.cat, data)
    this.showSubEx = true
      this.showSub = false


  }

  handleChangeExam(e: any) {
     const data = e.detail.value
    console.log('ionChange fired with Exam ID: ' + data);
    this.cat = data
      this.getSubjectsExam(data)
    this.showSubEx = true
   //  this.showCat = false
      this.showSub = false


   }


  ngOnInit() {
    this.authToken = localStorage.getItem('token')
    this.userId = localStorage.getItem('userId')
    this.classId = localStorage.getItem('class_id')
  //  this.generateItems();
    this.getPractice(2)
       this.getPractice1(1)
       this.getPractice2(3)
       this.getPractice3(4)
  }



  handleRefresh(event: any) {
     setTimeout(() => {
       this.getPractice(2)
       this.getPractice1(1)
       this.getPractice2(3)
       this.getPractice3(4)
          event.target.complete();
    }, 2000);
  }

  onReload() {
    this.ngOnInit()
  }

   onLoad() {

     this.iconRolled = !this.iconRolled;
    // this.onReload()
  }

    private generateItems() {
    const count = this.leaderData.length + 1;
    for (let i = 0; i < 50; i++) {
      this.leaderData.push(`Item ${count + i}`);
    }
    }

    onIonInfinite(ev: any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
    }



  getSubjectsExam(cat: any){

    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });
      this.apiService.get('api/user/assessment-subjects/'+cat, headers).subscribe({
        next: (data) => {

          if (data.status == 'success') {
               console.log('Subject successfully Fetched:', data);
            this.subjectDataEx = data.data

            console.log(this.subjectDataEx)


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



  getSubjects(class_id: any){

    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

      this.apiService.get('api/user/subject/class/'+class_id, headers).subscribe({
        next: (data) => {

          if (data.status == 'success') {
               console.log('Subject successfully Fetched:', data);
            this.subjectData = data.data

            console.log(this.subjectData)


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

   getStudy(classId: any, subj: any){
      const headers = new HttpHeaders({

            'Content-Type': 'application/json',
              Authorization: `Bearer ${this.authToken}`
      });
      this.apiService.get('api/user/study-module-subject/'+classId+'/'+subj, headers).subscribe({
        next: (data) => {
          this.leaderData = []
          if (data.status == 'success') {
            this.leaderData = []
            this.leaderData = data.data

            console.log('Top Subject Data successfully Fetched:', this.leaderData);
          } else {
            this.leaderData = []
             console.log(data.message);
          }

        },
        error: (error) => {
          this.leaderData = []
          console.error('Error Fetching Dashboard Data:', error);
        }
      });


   }

    getPractRanking(catId: any, subj: any){
      const headers = new HttpHeaders({

            'Content-Type': 'application/json',
              Authorization: `Bearer ${this.authToken}`
      });
      this.apiService.get('api/user/practice-test-sub/'+catId+'/'+subj, headers).subscribe({
        next: (data) => {
          this.leaderData = []
          if (data.status == 'success') {
            this.leaderData = data.data
            console.log('Top Subject Data successfully Fetched:', this.leaderData);
          } else {
            this.leaderData = []
             console.log(data.message);
          }
        },
        error: (error) => {
          this.leaderData = []
          console.error('Error Fetching Dashboard Data:', error);
        }
      });


    }



  getPractice(cat_id: any){



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    // console.log('get Report')
      this.apiService.get('api/user/practice-test/'+cat_id, headers).subscribe({
        next: (data) => {
          //console.log('report:',data)
            // Do something with the response data here
          if (data.status == 'success') {
            this.topSubject = data.data
            console.log('Leader Data successfully Fetched:', this.topSubject);


          } else {
             console.log(data.message);
          }
        },
        error: (error) => {
          console.error('Error Fetching leader Data:', error);
        }
      });


  }

  getPractice1(cat_id: any){



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    // console.log('get Report')
      this.apiService.get('api/user/practice-test/'+cat_id, headers).subscribe({
        next: (data) => {
          //console.log('report:',data)
            // Do something with the response data here
          if (data.status == 'success') {
            this.topSubject1 = data.data
            console.log('Leader Data successfully Fetched:', this.topSubject);


          } else {
             console.log(data.message);
          }
        },
        error: (error) => {
          console.error('Error Fetching leader Data:', error);
        }
      });


  }


  getPractice2(cat_id: any){



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    // console.log('get Report')
      this.apiService.get('api/user/practice-test/'+cat_id, headers).subscribe({
        next: (data) => {
          //console.log('report:',data)
            // Do something with the response data here
          if (data.status == 'success') {
            this.topSubject2 = data.data
            console.log('Leader Data successfully Fetched:', this.topSubject);


          } else {
             console.log(data.message);
          }
        },
        error: (error) => {
          console.error('Error Fetching leader Data:', error);
        }
      });


  }



  getPractice3(cat_id: any){



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    // console.log('get Report')
      this.apiService.get('api/user/practice-test/'+cat_id, headers).subscribe({
        next: (data) => {
          //console.log('report:',data)
            // Do something with the response data here
          if (data.status == 'success') {
            this.topSubject3 = data.data
            console.log('Leader Data successfully Fetched:', this.topSubject);


          } else {
             console.log(data.message);
          }
        },
        error: (error) => {
          console.error('Error Fetching leader Data:', error);
        }
      });


  }

}
