import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RapportRoutingModule } from './rapport-routing.module';
import { RapportsComponent } from './rapports/rapports.component';


@NgModule({
  declarations: [RapportsComponent],
  imports: [
    CommonModule,
    RapportRoutingModule
  ]
})
export class RapportModule { }
