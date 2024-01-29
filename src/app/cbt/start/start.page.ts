import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { RegisterService } from './../services/register.service';
import { AlertController, LoadingController} from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServiceService } from '../../services/api.service';
//import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { ProcessService } from 'src/app/services/process.service';
@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
paid: string | null = ''

  testTypeData: any[]=[]
  subjectData: any[]=[]
  qSetData: any[]=[]

@ViewChild('myModal', { static: true }) myModal!: IonModal;

  registrationForm!: FormGroup;
  cat_id: any
  responseData: any;
  postData: any;
  putData: any;
  class_id: any
  authToken: string | null = 'YOUR_AUTH_TOKEN'; // Replace with your authentication token

 // constructor(private apiService: ApiService) { }

  constructor(private processService: ProcessService, private apiService: ApiServiceService, private formBuilder: FormBuilder, private http: HttpClient, private alertController: AlertController, private router: Router, private routeAct: ActivatedRoute,
    private loadingCtrl: LoadingController) {

    this.registrationForm = this.formBuilder.group({
      subject: ['', Validators.required],
      qset: ['', Validators.required],
      testtype: ['', Validators.required],

    });



  }


  ngOnInit() {
    this.authToken = localStorage.getItem('token')
    this.class_id = localStorage.getItem('class_id')

      this.routeAct.params.subscribe(params => {

      if(this.routeAct){
         this.cat_id = this.routeAct.snapshot.paramMap.get('id')

         this.getSubjects(this.cat_id)

      }




      });
       this.paid = localStorage.getItem('payStatus')
    const paid = localStorage.getItem('payStatus')
    console.log('status',paid)
    this.getTestType()
  }

  checkUrl(item: any, subjectname: any) {
   // const inputString = "This is an English class.";
    const paid = localStorage.getItem('payStatus')
    if (paid === 'true') {
      return false
    } else {
        const containsEnglishOrMath = /english|math/i.test(subjectname);
         if (containsEnglishOrMath) {
            return false
          } else {
            return true
          }
    }



  }
  handleChange(env: any) {
     const check = env.target.value
   console.log(check);

    this.getQSet(check)
  }

  async startTest() {


    const loading = await this.loadingCtrl.create({message: 'Loading your.....'});
    await loading.present();





    if (this.registrationForm.valid) {

       const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });
        const subject = this.registrationForm.value.subject
      const qset = this.registrationForm.value.qset
      const testtype = this.registrationForm.value.testtype
      let num
      let duration: any
      if (testtype == 1) {
        num = 10
        duration = 10
      } else {
        num = 40
        duration = 45
      }

      this.apiService.get('api/user/create-assessment-test/'+testtype+'/'+qset+'/'+subject, headers).subscribe({
        next: (data) => {

            if(data.status == 'success'){
              loading.dismiss();
              console.log(data);
               // this.processService.updateData(data.data);
                this.router.navigateByUrl('/cbt/'+data.test_taken_id)

            } else {
              console.log(data.message);
            }
        },
        error: (error) => {
          loading.dismiss();
          console.error('Error starting test:', error);
        }
      });


    } else {
       loading.dismiss();
       //  this.presentAlert('Failed Alert', 'Invalid Form Data ');

    }

  }



  getTestType() {
     console.log('Test Type')
    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


      this.apiService.get('api/user/assessment-testTypes', headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Test Types successfully Fetched:', data);
            this.testTypeData = data.data

            console.log('Test Type',this.testTypeData)


          } else {
             // console.log('Hi2')
             // console.log(data.message);
            }
        },
        error: (error) => {
           // console.log('Hi 3')
          console.error('Error Fetching Test Types:', error);
        }
      });


  }

  getSubjects(cat_id: any) {

    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/assessment-subjects/'+cat_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Subjects successfully Fetched:', data);
            this.subjectData = data.data

            console.log(this.subjectData)


          } else {

              console.log(data.message);
            }
        },
        error: (error) => {
           // console.log('Hi 3')
          console.error('Error Fetching Subjects:', error);
        }
      });


  }
  getQSet(subj_id: any) {
    const paid = localStorage.getItem('payStatus')
    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    if (paid == 'true') {
        this.apiService.get('api/user/assessment-questionSet/'+subj_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Question Set successfully Fetched:', data);
            this.qSetData = data.data

            console.log(this.qSetData)


          } else {

              console.log(data.message);
            }
        },
        error: (error) => {
           // console.log('Hi 3')
          console.error('Error Fetching Question Set:', error);
        }
      });
    } else {
        this.apiService.get('api/user/assessment-questionSet/'+subj_id+'/5', headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Question Set successfully Fetched:', data);
            this.qSetData = data.data

            console.log(this.qSetData)


          } else {

              console.log(data.message);
            }
        },
        error: (error) => {
           // console.log('Hi 3')
          console.error('Error Fetching Question Set:', error);
        }
      });
    }




  }



  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Go to Dashboard',
          cssClass: 'custom-alert-button',
          handler: () => {

           this.router.navigateByUrl('loader');
          }
        }
      ]
    });

    await alert.present();
  }


}
