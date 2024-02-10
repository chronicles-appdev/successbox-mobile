import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent  implements OnInit {


 @Input() message: any;
  //url: string = 'https://ulearnlms.net/successboxV2/images/'
  url: string = 'https://185-167-96-73.cloud-xip.com/images_1/'
  ngOnInit() {}

   name!: string;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
