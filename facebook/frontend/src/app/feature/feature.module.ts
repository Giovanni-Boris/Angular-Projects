import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent,HomeComponent, RegisterComponent } from './pages';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ]
})
export class FeatureModule { }
