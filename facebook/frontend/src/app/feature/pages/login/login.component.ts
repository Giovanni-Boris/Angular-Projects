import { Component } from '@angular/core';
import { FormBuilder ,FormGroup,Validators  } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder){
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.minLength(5)]],
      password : ['', [Validators.required, Validators.minLength(5)]]

    });
  }

  onSubmit(e: Event){
    e.preventDefault();
    if(this.loginForm.valid){
      console.log('Formulario válido', this.loginForm.value);
    }
  }
}
