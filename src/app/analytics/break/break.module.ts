import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BreakPageRoutingModule } from './break-routing.module';

import { BreakPage } from './break.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreakPageRoutingModule
  ],
  declarations: [BreakPage]
})
export class BreakPageModule {}
