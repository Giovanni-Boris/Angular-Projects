import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../../store/user/user.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectToken } from '../../../store/user/user.selectors';

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
  private ngDestroyed$  = new Subject<void>();
  private readonly store: Store = inject(Store);
  ngOnInit(): void {
    this.store.select(selectToken)
    .pipe(takeUntil(this.ngDestroyed$))
    .subscribe((val)=>{
      if(val) {
        //this.store.dispatch(getUserData({ id: val.id}));
        //this.router.navigate(["/"])
        console.log(val)
      };
    })
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
