import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbtResultPageRoutingModule } from './cbt-result-routing.module';

import { CbtResultPage } from './cbt-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbtResultPageRoutingModule
  ],
  declarations: [CbtResultPage]
})
export class CbtResultPageModule {}
