import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CbtPageRoutingModule } from './cbt-routing.module';

import { CbtPage } from './cbt.page';
import { ModalComponent } from './modal/modal.component';
import { ImageComponent } from './image/image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CbtPageRoutingModule,ReactiveFormsModule
  ],
  declarations: [CbtPage, ModalComponent, ImageComponent]
})
export class CbtPageModule {}
