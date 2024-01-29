import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbtPage } from './cbt.page';

const routes: Routes = [
  {
    path: '',
    component: CbtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbtPageRoutingModule {}
