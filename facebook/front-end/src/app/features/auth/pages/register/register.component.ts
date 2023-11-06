import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnDestroy {
  public ngDestroyed$ = new Subject();

  registerForm: FormGroup;
  constructor(private fg: FormBuilder, private registerService: AuthService, private router: Router){
    this.registerForm = fg.group({
      name : ['', [Validators.required]],
      email : ['', [Validators.required]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      passwordAgain : ['', [Validators.required,Validators.minLength(6)]],

    });
  }


  onSubmit() {
    if (!this.registerForm.valid)return;
    this.registerService.register(this.registerForm.value)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe({
        next: data => {
          console.log('Registration successful');
          this.router.navigate(['/']);
        },
        error: err => {
          console.log(err);
        }
      });
  }
  ngOnDestroy(){
    this.ngDestroyed$.next("Complete");
    this.ngDestroyed$.complete();    
  }
}
