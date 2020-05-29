import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestStepsComponent } from './test-steps/test-steps.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ArchwizardModule} from 'angular-archwizard';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {CustomFormsModule} from 'ng2-validation';
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";




@NgModule({
  declarations: [TestStepsComponent],
  imports: [
    CommonModule,
    TestRoutingModule,
    FormsModule,
    ArchwizardModule,
    DropzoneModule,
    ReactiveFormsModule,
    CKEditorModule,
    CustomFormsModule,
    MatSelectModule,
    MatTableModule
  ]
})
export class TestModule { }
