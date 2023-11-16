import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDateFormatPipe } from './pipes/dateformat.pipe';



@NgModule({
  declarations: [CustomDateFormatPipe],
  imports: [
    CommonModule
  ],
  exports: [CustomDateFormatPipe]
})
export class SharedModule { }
