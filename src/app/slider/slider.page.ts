import { Component, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {
 private pageReloaded = false;
  constructor() { }

  ngOnInit() {
   //this.reloadPage()
  }
 reloadPage() {
    if (!this.pageReloaded) {
      window.location.reload();
      this.pageReloaded = true;
    }
  }
}
