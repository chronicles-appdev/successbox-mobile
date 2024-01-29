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
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {

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
  classData: any[]=[]

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
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
       cpassword: ['', Validators.required]
    });



  }


  ngOnInit() {
    // this.getClasses('primary')
  }

  async editUser() {


    const loading = await this.loadingCtrl.create({message: 'Creating.....'});
    await loading.present();





    if (this.registrationForm.valid) {

      const headersPost:any = {
      headers: {

          'Content-Type': 'application/json',
         'Accept': 'application/json'
      }
    };
      const postData : any = {

        "firstname": this.registrationForm.value.firstname,
         "lastname": this.registrationForm.value.lastname,
        "email": this.registrationForm.value.email,
        //  "admin_class_id":this.registrationForm.value.classid,
        "password": this.registrationForm.value.password,
             "password_confirmation": this.registrationForm.value.cpassword,
          "phone_number": this.registrationForm.value.phone

      };
      console.log(postData)
      this.apiService.put('api/auth/update/user', postData, headersPost).subscribe({
        next: (data) => {
            console.log(data);
            if(data.status == 'success'){
              loading.dismiss();


              localStorage.setItem('token', data.data.token);
              localStorage.setItem('userId', data.data.uid);
              localStorage.setItem('class_id', data.data.user.admin_class_id);
              localStorage.setItem('firstname', data.data.user.firstname);
              localStorage.setItem('lastname', data.data.user.lastname);

              localStorage.setItem('email', data.data.user.email);


               this.presentAlert('Success Alert', 'Profile updated Successfully');
            } else {
             // console.log(data.message);
            }
        },
        error: (error) => {
          loading.dismiss();
          console.error('Error creating record:', error);
        }
      });


    } else {
       loading.dismiss();
         this.presentAlert('Failed Alert', 'Invalid Form Data ');
   //   console.log('invalid Form data')
    }

  }





  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Go to Login',
          cssClass: 'custom-alert-button',
          handler: () => {

           this.router.navigateByUrl('login');
          }
        }
      ]
    });

    await alert.present();
  }


}
