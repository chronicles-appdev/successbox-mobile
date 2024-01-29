import { Component, OnInit } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { RegisterService } from './../services/register.service';
import { AlertController, LoadingController} from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from '../services/api.service';
//import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
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
      firstname: ['', [Validators.required, Validators.minLength(6)]],
      lastname: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });



  }


  ngOnInit() {
  }

  getSchools() {
      const headersGet: any = {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      }
    };

    this.apiService.get('api/school', headersGet).subscribe((data) => {
      this.responseData = data;
      console.log(data);
    });


  }

  getUser() {
      const headersGet: any = {
      headers: {
        Authorization: `Bearer ${this.authToken}`
      }
    };

    this.apiService.get('api/user', headersGet).subscribe((data) => {
      this.responseData = data;

      console.log(data);
    });


  }

  async registerUser() {


    const loading = await this.loadingCtrl.create({message: 'Creating.....'});
    await loading.present();



    localStorage.setItem('fullname', this.registrationForm.value.fullname);
    localStorage.setItem('school', this.registrationForm.value.school);

    if (this.registrationForm.valid) {

      const headersPost:any = {
      headers: {
        // Authorization: `Bearer ${this.authToken}`,
          'Content-Type': 'application/json',
         'Accept': 'application/json' // You can add other headers as needed
      }
    };
      const postData : any = {
      //   "name":"users",
      // "param":{

        "fullname": this.registrationForm.value.fullname,
         "username": this.registrationForm.value.username,
        "school_id": this.registrationForm.value.school,
        "user_type_id": this.registrationForm.value.user_type,
        "email": this.registrationForm.value.email,
          "password": this.registrationForm.value.password,
          "password_confirmation": this.registrationForm.value.password
        //  }
      };

      this.apiService.postPlain('api/auth/register', postData, headersPost).subscribe({
        next: (data) => {
          // console.log('Record created successfully:', data);

            // Do something with the response data here
            if(data.status == 'success'){
              loading.dismiss();

              localStorage.setItem('token', data.data.token);
              localStorage.setItem('userId', data.data.uid);
              localStorage.setItem('fullname', data.data.user.fullname);
              localStorage.setItem('username', data.data.user.username);
              localStorage.setItem('school_id', data.data.user.school_id);
              localStorage.setItem('user_type', data.data.user.user_type_id);
              localStorage.setItem('email', data.data.user.email);
              localStorage.setItem('created_at', data.data.user.created_at);
              // console.log(data.data.user);
              // console.log(data.data.token);
              // console.log(data.data.uid);

               this.presentAlert('Success Alert', 'Registration Successful');
            } else {
              console.log(data.message);
            }
        },
        error: (error) => {
          loading.dismiss();
          console.error('Error creating record:', error);
        }
      });


    }

     // Sample POST request
    // const postData = { key: 'value' }; // Replace with your POST data
    // this.apiService.postPlain('api/auth/register', postData).subscribe((data) => {
    //   this.postData = data;
    //   console.log(data);
    // });


    //  const postData = { key: 'value' }; // Replace with your POST data
    // const headersPost:any = {
    //   headers: {
    //     Authorization: `Bearer ${this.authToken}`,
    //     'Content-Type': 'application/json' // You can add other headers as needed
    //   }
    // };

    // this.apiService.post('api/auth/register', postData, headersPost).subscribe((data) => {
    //   this.postData = data;
    // });
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
            // Replace this URL with the one you want to navigate to
           // window.location.href = 'activate';
           this.router.navigateByUrl('home');
          }
        }
      ]
    });

    await alert.present();
  }


}
