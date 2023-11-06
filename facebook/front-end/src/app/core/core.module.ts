import { NgModule } from '@angular/core';
import { TopbarComponent } from './components/topbar/topbar.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    TopbarComponent
  ],
  imports: [
    MatIconModule
  ],
  exports:[TopbarComponent]
})
export class CoreModule { }
