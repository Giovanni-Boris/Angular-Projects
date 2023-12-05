import { Component, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Subject, concatMap, takeUntil } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';
import { FileService } from '../../../shared/services/file.service';
import { ProductService } from '../../../shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './new-product-page.component.html',
  styleUrl: './new-product-page.component.scss',
})
export class NewProductPageComponent implements OnDestroy {
  userForm!: FormGroup;
  ngDestroy$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private fileService: FileService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      ProductName: ['', Validators.required],
      Description: ['', [Validators.required]],
      Price: [0, Validators.required],
      StockQuantity: [0, [Validators.required, Validators.min(1)]],
    });
  }
  
  file: File | null = null;
  fileUrl: string = '';

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.file = files[0];
      this.fileUrl = URL.createObjectURL(this.file);
    }
  }
  onSubmit() {
    if (!this.file) window.alert('Add some image');
    if (!this.file || !this.userForm.valid) return;
    console.log(this.userForm.value);
    this.fileService
      .uploadSignature(this.file)
      .pipe(
        concatMap((cloudinaryImage) =>
          this.productService.createProduct({
            ...this.userForm.value,
            Img: cloudinaryImage.secure_url,
          })
        ),
        takeUntil(this.ngDestroy$)
      )
      .subscribe({
        next: () => this.router.navigate(["/products"]),
        error: (err) => {
          if(err?.error)
            window.alert(JSON.parse(err.error).Message)
        },
      });
  }
  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
