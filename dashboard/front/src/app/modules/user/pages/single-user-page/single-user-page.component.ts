import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../../../shared/components/chart/chart.component';
import { TableComponent } from '../../../shared/components/table/table.component';

@Component({
  selector: 'app-single-user-page',
  standalone: true,
  imports: [CommonModule, ChartComponent, TableComponent],
  templateUrl: './single-user-page.component.html',
  styleUrl: './single-user-page.component.scss'
})
export class SingleUserPageComponent {

}
