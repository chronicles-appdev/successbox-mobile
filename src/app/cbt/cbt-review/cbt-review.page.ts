import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonContent, ModalController } from '@ionic/angular';
import { ApiServiceService } from '../../services/api.service';
import { IonModal } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-cbt-review',
  templateUrl: './cbt-review.page.html',
  styleUrls: ['./cbt-review.page.scss'],
})
export class CbtReviewPage implements OnInit {
 @Input()
 questionid!: number;

   @ViewChild(IonContent)
   content!: IonContent;

   @Input()
  indexing!: number;
  marking: any[] = [];

  @ViewChild('modal') modal!: IonModal;
   modalImage!: string;
  quest: any = [];
  options: any = [];
  question_id: any;

 authToken!: any;
  scoreData: any=[];
  tt_id!: any
  total: any

  constructor(private animationCtrl: AnimationController, private routeAct: ActivatedRoute, private apiService: ApiServiceService, private modalController: ModalController) { }

  ngOnInit() {
      this.authToken = localStorage.getItem('token')
     this.routeAct.params.subscribe(params => {

      if(this.routeAct){
        this.tt_id = this.routeAct.snapshot.paramMap.get('id')
      }

     });

    this.getScore(this.tt_id)
  }

  getScore(tt_id: any){



    const headers = new HttpHeaders({

            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authToken}`
    });


      this.apiService.get('api/user/assessment-review/'+tt_id, headers).subscribe({
        next: (data) => {

            // Do something with the response data here
          if (data.status == 'success') {
             this.scoreData = data.data
              console.log(this.scoreData)

          } else {
             console.log(data.message);
          }
        },
        error: (error) => {
          console.error( error);
        }
      });


  }



  async openModal(imageUrl: string) {
    this.modalImage = 'https://ulearnlms.net/igcse/images/'+imageUrl;
    await this.modal.present();
  }

   closeModal() {
    this.modal.dismiss();
   }


scrollToTop() {
  this.content.scrollToTop(300); // 300ms animation duration (optional)
}

   enterAnimation = (baseEl: HTMLElement) => {
    const root: any = baseEl.shadowRoot;

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
