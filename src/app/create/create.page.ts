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
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

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
  stateData: any[] = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara'
];

// You can use this array as needed in your application.


@ViewChild('myModal', { static: true }) myModal!: IonModal;

  registrationForm!: FormGroup;

  responseData: any;
  postData: any;
  putData: any;
  referral!: string | null;
  authToken: string = 'YOUR_AUTH_TOKEN'; // Replace with your authentication token

 // constructor(private apiService: ApiService) { }

  constructor(private routeAct: ActivatedRoute,private apiService: ApiServiceService, private formBuilder: FormBuilder, private http: HttpClient, private alertController: AlertController, private router: Router,
    private loadingCtrl: LoadingController) {

    this.registrationForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      classid: ['', Validators.required],
      levelid: ['', Validators.required],
       refferal: [this.referral, Validators.required],
          state: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
       cpassword: ['', Validators.required]
    });



  }


  ngOnInit() {
    // this.getClasses('primary')
     if(this.routeAct){

        this.referral = this.routeAct.snapshot.paramMap.get('id')
      }
  }

  async registerUser() {


    const loading = await this.loadingCtrl.create({message: 'Creating.....'});
    await loading.present();





    if (this.registrationForm.valid) {
      if (this.registrationForm.value.password == this.registrationForm.value.cpassword) {

        const headers = new HttpHeaders ({
            'Content-Type': 'application/json',
           'Accept': 'application/json',



      });
      const postData : any = {

        "firstname": this.registrationForm.value.firstname,
         "lastname": this.registrationForm.value.lastname,
        "email": this.registrationForm.value.email,
         "state": this.registrationForm.value.state,
         "admin_class_id":this.registrationForm.value.classid,
        "password": this.registrationForm.value.password,
         "password_confirmation": this.registrationForm.value.cpassword,
          "phone_number": this.registrationForm.value.phone

      };
      console.log(postData)
      this.apiService.postPlain('api/auth/user/register', postData, headers).subscribe({
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


               this.presentAlert('Success Alert', 'Registration Successful');
            } else {
             // console.log(data.message);
            }
        },
        error: (error) => {
          loading.dismiss();
             this.presentAlertF('Error Message',error.error.message);
          console.error('Error creating record:', error);
        }
      });


      } else {
          loading.dismiss();
         this.presentAlertF('Failed Alert', 'Password Mismatch');
      }

    } else {
       loading.dismiss();
         this.presentAlertF('Failed Alert', 'Invalid Form Data ');
   //   console.log('invalid Form data')
    }

  }

  handleChange(ev: any) {
   const check = ev.target.value
   console.log(check);
   this.getClasses(check)
  }

  getClasses(level: any){

   // console.log('Hi')


    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/class-details/level/'+level, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Classes successfully Fetched:', data);
            this.classData = data.data

           // console.log(this.classData)


          } else {
             // console.log('Hi2')
             // console.log(data.message);
            }
        },
        error: (error) => {
           // console.log('Hi 3')
          console.error('Error Fetching Classes:', error);
        }
      });


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
                // this.router.navigate(['.'],  '/tabs/home' );
           this.router.navigateByUrl('/login');
          }
        }
      ]
    });

    await alert.present();
  }


  async presentAlertF(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'Try Again',
          cssClass: 'custom-alert-button',
          handler: () => {

          // this.router.navigateByUrl('loader');
          }
        }
      ]
    });

    await alert.present();
  }


}
