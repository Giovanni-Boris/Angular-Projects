import {
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { Product } from '../../../shared/interfaces/product.model';

@Component({
  selector: 'app-datatable',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, RouterLink, MatPaginatorModule],
  templateUrl: './datatable.component.html',
  styleUrl: './datatable.component.scss',
})
export class DatatableComponent {
  displayedColumns: string[] = [
    'select',
    'id',
    'productName',
    'img',
    'price',
    'stockQuantity',
    'description',
    'action',
  ];
  _source: Product[] = [];
  dataSource = new MatTableDataSource<Product>(this.source);
  selection = new SelectionModel<Product>(true, []);
  ngDestroy$: Subject<void> = new Subject<void>();

  @Input() set source(orders: Product[]) {
    this._source = orders;
    this.dataSource = new MatTableDataSource<Product>(orders);
    this.dataSource.paginator = this.paginator;
  }
  get source(): Product[] {
    return this._source;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  handleDelete(order: Product) {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete your account?'
    );

    if (userConfirmed) {
      const index = this.dataSource.data.indexOf(order);
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
      this.dataSource.data;
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}
