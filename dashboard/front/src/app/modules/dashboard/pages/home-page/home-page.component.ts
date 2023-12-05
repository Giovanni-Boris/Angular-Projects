import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from '../../components/widgets/widgets.component';
import { FeaturedComponent } from '../../components/featured/featured.component';
import { ChartComponent } from '../../../shared/components/chart/chart.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { Store } from '@ngrx/store';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, WidgetsComponent, FeaturedComponent, ChartComponent, TableComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent  {
  private orderService = inject(OrderService)
  orders$ = this.orderService.getOrders();

}
