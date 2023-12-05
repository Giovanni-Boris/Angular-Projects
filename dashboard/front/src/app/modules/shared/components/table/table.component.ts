import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Order } from '../../interfaces/order.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  displayedColumns: string[] = [
    'id',
    'productName',
    'img',
    'customer',
    'date',
    'amount',
    'method',
    'status',
  ];
  @Input()
  rows!: Order[];
}
