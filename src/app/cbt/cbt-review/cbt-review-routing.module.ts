import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbtReviewPage } from './cbt-review.page';

const routes: Routes = [
  {
    path: '',
    component: CbtReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbtReviewPageRoutingModule {}
