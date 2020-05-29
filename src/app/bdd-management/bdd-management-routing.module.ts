import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BddConsultComponent} from './bdd-consult/bdd-consult.component';


const routes: Routes = [
  {
    path: 'consult',
    component: BddConsultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BddManagementRoutingModule { }
