import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmCartazPage } from './em-cartaz.page';

const routes: Routes = [
  {
    path: '',
    component: EmCartazPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmCartazPageRoutingModule {}
