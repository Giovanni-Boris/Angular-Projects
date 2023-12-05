import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../shared/services/user.service';
import { ProductService } from '../../../shared/services/product.service';
import { OrderService } from '../../../shared/services/order.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../shared/interfaces/user.model';
import { Product } from '../../../shared/interfaces/product.model';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.scss',
})
export class CreateOrderComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  productOptions: Product[] = [];
  userOptions: User[] = [];
  orderForm!: FormGroup;
  statusOptions: string[] = ['Approved', 'Pending'];
  ngDestroy$ = new Subject<void>();
  ngOnInit() {
    this.productService
      .getProducts()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((products) => (this.productOptions = products));
    this.userService
      .getAllUserData()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((users) => (this.userOptions = users));

    this.orderForm = this.fb.group({
      Amount: [0, [Validators.required]],
      Method: ['Card', Validators.required],
      Status: ['Approved', Validators.required],
      productId: ['', Validators.required],
      userId: ['', Validators.required],
    });
  }
  onSubmit() {
    if (!this.orderForm.valid) return;
    console.log(this.orderForm.value);
    this.orderService
      .createOrder(this.orderForm.value)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((val)=>{
        console.log(val);
        this.router.navigate(["/"])
      });
  }
  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
