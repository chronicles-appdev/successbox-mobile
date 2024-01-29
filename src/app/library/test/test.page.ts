import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ApiServiceService } from 'src/app/services/api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  topic_id!: any;
  subject_id!: any;
  color: string = 'primary'
    color1: string ='warning'
  public progress = 0.4;
  authToken!: any;
  questionsData: any[] = []
  currentQuestionIndex: number = 0;
  times: any;

  headData: any=[]
  optionsForm: FormGroup;

  constructor(private route: Router, private routeAct: ActivatedRoute, private apiService: ApiServiceService, private formBuilder: FormBuilder, private alertController: AlertController) {
    this.optionsForm = this.formBuilder.group({
      selectedOption: [''],
       selectedOption1: ['']
    });
  }

  ngOnInit() {
      this.authToken = localStorage.getItem('token')
      this.routeAct.params.subscribe(params => {

      if(this.routeAct){

        this.topic_id = this.routeAct.snapshot.paramMap.get('id')
      }

        this.getTest(this.topic_id)
        this.getSubjTopic(this.topic_id)


      });

    this.formatTime(5)

  }

  goto(id: any) {

    // if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex = id;
    // }
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


  prevQuestion() {

    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
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

    console.log(headers)
      this.apiService.get('api/user/subject-details/topic/'+topic_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {

            this.headData = data.data[0]
              console.log('Head Data successfully Fetched:', this.headData);
            this.subject_id = this.headData.id


          } else {

              console.log(data.message);
            }
        },
        error: (error) => {
            console.log('Hi 3')
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

//   getColor(id: any) {

//     if (id = this.currentQuestionIndex) {
//       return ""
//     }
// }
  getTest(topic_id: any){

    console.log('Hi')


    const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });

    console.log(headers)
      this.apiService.get('api/user/testquestion/topic/'+topic_id, headers).subscribe({
        next: (data) => {
            console.log('Hi1')
            // Do something with the response data here
          if (data.status == 'success') {
               console.log('Questions successfully Fetched:', data);
            this.questionsData = data.data

            console.log(this.questionsData)


          } else {

              console.log(data.message);
            }
        },
        error: (error) => {
            console.log('Hi 3')
          console.error('Error Fetching Questions:', error);
        }
      });


  }


   saveProgress(topicId: any, subjectId: any) {

       const headers = new HttpHeaders({

          'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


        const url = 'api/user/update-topic-progress/'+topicId+ '/'+ subjectId+'/'+1
      this.apiService.get(url, headers).subscribe({
        next: (data) => {

            if(data.status == 'success'){

              console.log(data);

            } else {
              console.log(data);
            }
        },
        error: (error) => {

          console.error('Error saving progress:', error);
        }
      });




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

      this.apiService.post('api/user/update-select-option/'+markingid, postData, headersPost).subscribe({
        next: (data) => {

            if(data.status == 'success'){

              console.log(data);

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
    this.saveProgress(this.topic_id, this.subject_id)
    this.route.navigateByUrl('/congrats/'+this.topic_id);
  }

  checkColor(valu: any) {
    if (valu === null) {
      return 'dark';
    }else if (valu !== null) {
      return 'primary';
    }
    return 'dark'
  }
}
