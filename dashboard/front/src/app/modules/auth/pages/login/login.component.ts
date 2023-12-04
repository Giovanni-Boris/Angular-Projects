import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUserData, login } from '../../../store/user/user.actions';
import { Subject, concat, filter, takeUntil } from 'rxjs';
import {
  selectIsError,
  selectToken,
  selectUserData,
} from '../../../store/user/user.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  private ngDestroyed$ = new Subject<void>();
  private readonly store: Store = inject(Store);
  private readonly router: Router = inject(Router);
  error$ = this.store.select(selectIsError);
  ngOnInit(): void {
    this.store
      .select(selectToken)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((token) => {
        if (token) {
          this.store.dispatch(getUserData({ id: token.id }));
          this.router.navigate(['/']);
        }
      });
    this.store
      .select(selectIsError)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((error) => {
        if (error) {
          window.alert(error?.error?.Message)
        }
      });
  }

  onSubmit() {
    if (this.username.length < 2 && this.password.length < 2) return;
    this.store.dispatch(
      login({ Username: this.username, Password: this.password })
    );
  }
  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
