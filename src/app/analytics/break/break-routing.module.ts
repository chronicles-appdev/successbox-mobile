import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BreakPage } from './break.page';

const routes: Routes = [
  {
    path: '',
    component: BreakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BreakPageRoutingModule {}
