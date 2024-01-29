import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CbtResultPage } from './cbt-result.page';

const routes: Routes = [
  {
    path: '',
    component: CbtResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CbtResultPageRoutingModule {}
