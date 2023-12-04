import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Route, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  setDarkTheme,
  setLightTheme,
} from '../../../store/theme/theme.actions';
import { logout } from '../../../store/user/user.actions';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private store: Store = inject(Store);
  private router: Router = inject(Router);
  handleClickDark() {
    this.store.dispatch(setLightTheme());
  }
  handleClickLight() {
    this.store.dispatch(setDarkTheme());
  }
  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/auth/login']);
  }
}
