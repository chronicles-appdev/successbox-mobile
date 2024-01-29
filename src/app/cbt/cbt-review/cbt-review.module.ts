import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbtReviewPageRoutingModule } from './cbt-review-routing.module';

import { CbtReviewPage } from './cbt-review.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbtReviewPageRoutingModule
  ],
  declarations: [CbtReviewPage]
})
export class CbtReviewPageModule {}
