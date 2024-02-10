import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { ApiServiceService } from '../services/api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {

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
  authToken: string | null = 'YOUR_AUTH_TOKEN'; // Replace with your authentication token

 // constructor(private apiService: ApiService) { }

  constructor(private apiService: ApiServiceService, private formBuilder: FormBuilder, private http: HttpClient, private alertController: AlertController, private router: Router,
    private loadingCtrl: LoadingController) {

    this.registrationForm = this.formBuilder.group({
      title: ['', Validators.required],
      message: ['', Validators.required],

    });



  }


  ngOnInit() {
    // this.getClasses('primary')
     this.authToken = localStorage.getItem('token')
  }

  async feedBackCreate() {


    const loading = await this.loadingCtrl.create({message: 'Creating.....'});
    await loading.present();





    if (this.registrationForm.valid) {



       const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log('Token',this.authToken)
      const postData : any = {

        "subject": this.registrationForm.value.title,
         "body": this.registrationForm.value.message,


      };
       // console.log(postData)

      this.apiService.post('api/user/feedback-store', postData, headers).subscribe({
        next: (data) => {
            console.log(data);
            if(data.status == 'success'){
              loading.dismiss();


               this.presentAlert('Success Alert', 'Thanks for the Feedback');
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
         this.presentAlertF('Failed Alert', 'Invalid Form Data ');
   //   console.log('invalid Form data')
    }

  }

  handleChange(ev: any) {
   const check = ev.target.value
   console.log(check);

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
                // this.router.navigate(['.'],  '/tabs/home' );
           this.router.navigateByUrl('/tabs/home');
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
