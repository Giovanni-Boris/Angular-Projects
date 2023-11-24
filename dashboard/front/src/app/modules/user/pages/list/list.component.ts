import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from '../../../shared/components/datatable/datatable.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, DatatableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

}
