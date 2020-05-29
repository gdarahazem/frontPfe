import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserManagementComponent} from './user-management/user-management.component';
import {ProjectManagementComponent} from './project-management/project-management.component';


const routes: Routes = [
  {
    path: 'users-management',
    component: UserManagementComponent
  },
  {
    path: 'project-management',
    component: ProjectManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
