import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TestStepsComponent} from './test-steps/test-steps.component';


const routes: Routes = [
  {
    path: 'test-steps',
    component: TestStepsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
