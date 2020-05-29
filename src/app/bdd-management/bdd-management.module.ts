import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BddManagementRoutingModule } from './bdd-management-routing.module';
import { BddConsultComponent } from './bdd-consult/bdd-consult.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArchwizardModule} from 'angular-archwizard';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CustomFormsModule} from 'ng2-validation';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [BddConsultComponent],
  imports: [
    CommonModule,
    BddManagementRoutingModule,
    FormsModule,
    ArchwizardModule,
    DropzoneModule,
    ReactiveFormsModule,
    CKEditorModule,
    CustomFormsModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule
  ]
})
export class BddManagementModule { }
