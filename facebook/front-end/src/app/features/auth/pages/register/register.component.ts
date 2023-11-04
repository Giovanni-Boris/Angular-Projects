import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(private fg: FormBuilder){
    this.registerForm = fg.group({
      username : ['', [Validators.required]],
      email : ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      passwordAgain : ['', [Validators.required,Validators.minLength(6)]],

    });
  }
  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Formulario válido', this.registerForm.value);
    }
  }
}
