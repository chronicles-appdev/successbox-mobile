import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaderPage } from './leader.page';

const routes: Routes = [
  {
    path: '',
    component: LeaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaderPageRoutingModule {}
