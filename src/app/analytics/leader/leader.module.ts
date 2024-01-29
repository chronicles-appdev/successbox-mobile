import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaderPageRoutingModule } from './leader-routing.module';

import { LeaderPage } from './leader.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaderPageRoutingModule
  ],
  declarations: [LeaderPage],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class LeaderPageModule {}
