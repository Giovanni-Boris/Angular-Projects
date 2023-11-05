import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/user/user.actions';
import { selectToken } from 'src/app/store/user/user.selectors';
selectToken
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public tokenUser$ = this.store.select(selectToken);
  public loginForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(login(this.loginForm.value));
    }
  }
}
