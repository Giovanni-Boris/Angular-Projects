import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

  ngOnInit(): void {}

  onSubmit() {
    if (this.username.length > 1 && this.password.length > 1) { 
      console.log(this.username, this.password)
    }
  }
  ngOnDestroy(): void {}
}
