import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getUserData, login } from 'src/app/store/user/user.actions';
import { selectIsFecthing, selectToken } from 'src/app/store/user/user.selectors';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
selectToken
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy, OnInit {
  public ngDestroyed$ = new Subject();
  public loginForm: FormGroup;
  isFetching$ = this.store.select(selectIsFecthing);
  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  ngOnInit(): void {

    this.store.select(selectToken)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((val)=>{
        if(val) {
          this.store.dispatch(getUserData({ id: val.id}));
          this.router.navigate(["/"])
        };
      })
  }
  
  onSubmit(): void {
    if (!this.loginForm.valid) return ;
    this.store.dispatch(login(this.loginForm.value));
  }
  ngOnDestroy(): void {
    this.ngDestroyed$.next("Complete");
    this.ngDestroyed$.complete();
  }
}
