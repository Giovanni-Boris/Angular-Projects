import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from '../../components/datatable/datatable.component';
import { UserService } from '../../../shared/services/user.service';
import { Subject, concatMap, filter, takeUntil } from 'rxjs';
import { User } from '../../../shared/interfaces/user.model';
import { Store } from '@ngrx/store';
import { selectTokenId } from '../../../store/user/user.selectors';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, DatatableComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private store: Store = inject(Store);
  users: User[] = [];
  ngDestroy$: Subject<void> = new Subject<void>();
  userId: String = '';
  ngOnInit(): void {
    this.store
      .select(selectTokenId)
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((id) => {
        if (id) {
          this.userId = id;
          this.getUsers();
        }
      });
  }
  getUsers() {
    this.userService
      .getAllUserData()
      .pipe(takeUntil(this.ngDestroy$))
      .subscribe((users) => {
        this.users = users.filter((el) => el.id !== this.userId);
      });
  }
  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
