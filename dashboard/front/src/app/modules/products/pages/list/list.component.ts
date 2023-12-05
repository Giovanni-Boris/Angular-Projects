import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { UserService } from '../../../shared/services/user.service';
import { Subject, concatMap, filter, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTokenId } from '../../../store/user/user.selectors';
import { User } from '../../../shared/interfaces/user.model';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, DatatableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private productService = inject(ProductService);
  products$ = this.productService.getProducts();

}
