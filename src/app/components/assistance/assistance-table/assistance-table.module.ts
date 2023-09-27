import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistanceTableComponent } from './assistance-table.component';
import { MaterialModule } from 'src/app/shared/modules/material.module';



@NgModule({
  declarations: [
    AssistanceTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    AssistanceTableComponent
  ]
})
export class AssistanceTableModule { }
