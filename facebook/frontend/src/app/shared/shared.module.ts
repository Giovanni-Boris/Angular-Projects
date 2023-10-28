import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    TopbarComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports :[
    TopbarComponent
  ]
})
export class SharedModule { }
