import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './modules/shared/components/navbar/navbar.component';
import { SidebarComponent } from './modules/shared/components/sidebar/sidebar.component';
import { Store } from '@ngrx/store';
import { selectThemeMode } from './modules/store/theme/theme.selectors';
import { selectIsLogged } from './modules/store/user/user.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'front';
  private readonly store: Store = inject(Store);
  isLoggedIn$ = this.store.select(selectIsLogged)
  darkMode$ = this.store.select(selectThemeMode);
}
