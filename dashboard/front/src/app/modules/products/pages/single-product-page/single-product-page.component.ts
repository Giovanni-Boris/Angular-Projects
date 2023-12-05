import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, map, switchMap, takeUntil } from 'rxjs';
import { TableComponent } from '../../../shared/components/table/table.component';
import { Order } from '../../../shared/interfaces/order.model';
import { OrderService } from '../../../shared/services/order.service';
import { ChartComponent } from '../../../shared/components/chart/chart.component';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/interfaces/product.model';

@Component({
  selector: 'app-single-product-page',
  standalone: true,
  imports: [CommonModule, ChartComponent, TableComponent],
  templateUrl: './single-product-page.component.html',
  styleUrl: './single-product-page.component.scss',
})
export class SingleUserPageComponent implements OnInit, OnDestroy {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  ordersProduct$ : Observable<Order[]> | undefined;
  _actualProduct: Product | undefined;
  ngDestroy$ = new Subject<void>();
  set actualProduct(product: Product){
    this._actualProduct = product;
    this.ordersProduct$  = this.orderService.getOrdersProduct(product.id);
  }
  get actualProduct(): Product | undefined{
    return this._actualProduct;
  }
  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['productId']),
        switchMap((productId) => this.productService.getProductById(productId)),
        takeUntil(this.ngDestroy$)
      )
      .subscribe((product) => {
        this.actualProduct = product;
      });
  }
  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
