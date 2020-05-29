import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserManagementComponent } from './user-management/user-management.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { ProjectManagementComponent } from './project-management/project-management.component';
import {ArchwizardModule} from 'angular-archwizard';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CustomFormsModule} from 'ng2-validation';


@NgModule({
  declarations: [UserManagementComponent, ProjectManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    ArchwizardModule,
    DropzoneModule,
    CKEditorModule,
    CustomFormsModule
  ]
})
export class AdminModule { }
