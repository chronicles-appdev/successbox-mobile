import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { AnimationController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/services/api.service';
import { ProcessService } from 'src/app/services/process.service';



import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { ImageComponent } from './image/image.component';
@Component({
  selector: 'app-cbt',
  templateUrl: './cbt.page.html',
  styleUrls: ['./cbt.page.scss'],
})
export class CbtPage implements OnInit {
 topic_id!: any;
  color: string = 'primary'
    color1: string ='warning'
  public progress = 0.4;
  authToken!: any;
  questionInfo: any
  questionsData: any[] = []
  currentQuestionIndex: number = 0;
  times: any;
  nameData: any = []
  tt_id: any

  headData: any=[]
  optionsForm: FormGroup;



  constructor(private modalCtrl: ModalController,private animationCtrl: AnimationController,private processService: ProcessService, private route: Router, private routeAct: ActivatedRoute, private apiService: ApiServiceService, private formBuilder: FormBuilder, private alertController: AlertController) {



    this.optionsForm = this.formBuilder.group({
      selectedOption: [''],
       selectedOption1: ['']
    });


  }

    isModalOpen = false;
     isModalOpen1 = false;

  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;

  }

  setOpen1(isOpen: boolean) {

    this.isModalOpen1 = isOpen;

  }

   async openModal(message: any) {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
       componentProps: {
      message: message,
    },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();


  }



   async openModal1(message: any) {
    const modal = await this.modalCtrl.create({
      component: ImageComponent,
       componentProps: {
      message: message,
    },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();


  }

  ngOnInit() {
    this.authToken = localStorage.getItem('token')
      // this.processService.data$.subscribe((data) => {


      //   this.questionsData = data
      //   console.log(this.questionsData)

      // });

      this.routeAct.params.subscribe(params => {

      if(this.routeAct){

        this.tt_id = this.routeAct.snapshot.paramMap.get('id')
      }
      this.getQuestions()

      this.getName()
      });



  }

  handleChange(ev: any, markingid: any) {
    let valueq = ev.target.value
    let option
    if (valueq === 'A') {

      option = 'A'
    }  else if (valueq === 'B') {

      option = 'B'
    } else if (valueq === 'C') {

        option = 'C'

    } else if (valueq === 'D') {

      option = 'D'

    }

      this.questionsData[this.currentQuestionIndex].selected_option = option
    this.saveOption(option, markingid)




  }

  getQuestions() {

    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


      this.apiService.get('api/user/user-assessment-questions/'+this.tt_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
              // console.log('Questions successfully Fetched:', data);
            this.questionsData = data.data
            this.questionInfo = data.duration
             this.formatTime(this.questionInfo)
            console.log('questions:',this.questionsData)
          } else {

            }
        },
        error: (error) => {
           // console.log('Hi 3')
          console.error('Error Fetching Test Types:', error);
        }
      });


  }

  prevQuestion() {

    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }


  goto(id: any) {

    // if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex = id;
    // }
  }

  nextQuestion() {

    if (this.currentQuestionIndex < this.questionsData.length - 1) {

    //  this.onSubmit();
      this.currentQuestionIndex++;
    }

  }

    getSubjTopic(topic_id: any){



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


      this.apiService.get('api/user/subject-details/topic/'+topic_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {

            this.headData = data.data[0]
            //  console.log('Head Data successfully Fetched:', this.headData);



          } else {

              console.log(data.message);
            }
        },
        error: (error) => {

          console.error('Error Fetching Subject details:', error);
        }
      });


    }



    getName(){



    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


      this.apiService.get('api/user/user-subject-year/'+this.tt_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {

            this.nameData = data
            console.log('Head Name successfully Fetched:', data);



          } else {

              console.log(data.message);
            }
        },
        error: (error) => {

          console.error('Error Fetching Subject details:', error);
        }
      });


  }
  formatTime(minutes: number): void {
  let seconds = minutes * 60;

  const interval = setInterval(() => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    this.times = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    seconds--;

    if (seconds < 0) {
      clearInterval(interval);

      this.submitFunc()
    }
  }, 1000);
}




   saveOption(option: any, markingid: any) {

      const headersPost:any = {
      headers: {

          'Content-Type': 'application/json',
          'Accept': 'application/json',
           Authorization: `Bearer ${this.authToken}`
      }
    };
      const postData : any = {

        "selected_option": option


      };

      this.apiService.post('api/user/assessment-update-selection/'+markingid, postData, headersPost).subscribe({
        next: (data) => {

            if(data.status == 'success'){

            //  console.log(data);

            } else {
              console.log(data);
            }
        },
        error: (error) => {

          console.error('Error saving option:', error);
        }
      });




   }


  async confirmAlert() {
    const alert = await this.alertController.create({
      header: 'Are you you want to Submit your Test ?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',

        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
           this.submitFunc();


          }
        },
      ],
    });

    await alert.present();
  }

  submitFunc() {
    // this.tt_id = this. questionsData[this.currentQuestionIndex]?.test_taken_id
    this.route.navigateByUrl('/tabs/cbt-report/'+this.tt_id);
   }


  checkColor(valu: any) {
    if (valu === null) {
      return 'dark';
    }else if (valu !== null) {
      return 'primary';
    }
    return 'dark'
  }

   enterAnimation = (baseEl: HTMLElement) => {
    const root:any = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
}
