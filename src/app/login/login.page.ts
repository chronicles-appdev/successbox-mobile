import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { RegisterService } from './../services/register.service';
import { AlertController, LoadingController} from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiServiceService } from '../services/api.service';
//import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  handlerMessage = '';
  roleMessage = '';
  name!: string;
  myForm: NgForm = new NgForm([], []);

  //myForm: FormGroup;
  fullName!: string;
  //class!: string;
  password!: string;
  email!: string;
  phone!: string;
  activationCode!: string;


@ViewChild('myModal', { static: true }) myModal!: IonModal;

  registrationForm!: FormGroup;

  responseData: any;
  postData: any;
  putData: any;
  authToken: string = 'YOUR_AUTH_TOKEN'; // Replace with your authentication token

 // constructor(private apiService: ApiService) { }

  constructor(private apiService: ApiServiceService, private formBuilder: FormBuilder, private http: HttpClient, private alertController: AlertController, private router: Router,
    private loadingCtrl: LoadingController) {

    this.registrationForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });



  }


  ngOnInit() {
  }
 async loginUser() {


    const loading = await this.loadingCtrl.create({message: 'Login.....'});
    await loading.present();





    if (this.registrationForm.valid) {

      const headersPost:any = {
      headers: {
        // Authorization: `Bearer ${this.authToken}`,
          'Content-Type': 'application/json',
         'Accept': 'application/json' // You can add other headers as needed
      }
    };
      const postData : any = {

        "email": this.registrationForm.value.email,
          "password": this.registrationForm.value.password,

      };

      this.apiService.postPlain('api/auth/user/login', postData, headersPost).subscribe({
        next: (data) => {
           console.log('Login successfully:', data);

            // Do something with the response data here
            if(data.status == 'success'){
              loading.dismiss();

              localStorage.setItem('token', data.data.token);
              localStorage.setItem('userId', data.data.uid);
              localStorage.setItem('firstname', data.data.user.firstname);
              localStorage.setItem('lastname', data.data.user.lastname);
                localStorage.setItem('class_id', data.data.user.admin_class_id);
            //  localStorage.setItem('classid', data.data.user.admin_class_id);
              localStorage.setItem('email', data.data.user.email);
              localStorage.setItem('created_at', data.data.user.created_at);

              this.fetchStatus(data.data.token)
               this.presentAlert('Success Alert', 'Login Successful');
            } else {
              this.presentFailedAlert('Failed!!!', 'Login Failed,<br> Please try again')
              console.log(data.message);
            }
        },
        error: (error) => {
          loading.dismiss();
             this.presentFailedAlert('Failed!!!', 'Login Failed, Please try again')
          console.error('Error creating record:', error);
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

           this.router.navigateByUrl('/tabs/home');
          }
        }
      ]
    });

    await alert.present();
  }




  async presentFailedAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Close',
          cssClass: 'custom-alert-button',
          handler: () => {

           this.router.navigateByUrl('login');
          }
        }
      ]
    });

    await alert.present();
  }


  fetchStatus(token: any){
    // console.log('Hi')
      const headers = new HttpHeaders({
            'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
      });
        this.apiService.get('api/payment-status', headers).subscribe({
          next: (data) => {
            console.log(data)
              // Do something with the response data here
            if (data.status == 'success') {
            //  this.paid = 'true'
              localStorage.setItem('payStatus', 'true')
                // this.route.navigateByUrl('/tabs/home')
              console.log(data)
            console.log('status successfully Fetched:', data);
            } else {
                localStorage.setItem('payStatus', 'false')
                console.log(data.message);
              }
          },
          error: (error) => {
              localStorage.setItem('payStatus', 'false')
            console.error('Error Fetching:', error);

          }
        });


  }

}
