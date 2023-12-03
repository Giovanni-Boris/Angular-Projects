import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { UserService } from '../../../shared/services/user.service';
import { Subject } from 'rxjs';
import { User } from '../../../shared/interfaces/user.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, DatatableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  private userService  = inject(UserService);
  users$ = this.userService.getAllUserData();
}
