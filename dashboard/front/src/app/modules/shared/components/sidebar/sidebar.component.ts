import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { setDarkTheme, setLightTheme } from '../../../store/theme/theme.actions';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private store :Store = inject(Store);
  handleClickDark(){
    this.store.dispatch(setLightTheme());
  }
  handleClickLight(){
    this.store.dispatch(setDarkTheme());
  }
}
