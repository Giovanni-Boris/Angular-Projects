import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  inject,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { User } from '../../../shared/interfaces/user.model';
import { UserService } from '../../../shared/services/user.service';
import { Subject, takeUntil } from 'rxjs';


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
    'username',
    'img',
    'status',
    'email',
    'age',
    'action',
  ];
  _source: User[] = [];
  dataSource = new MatTableDataSource<User>(this.source);
  selection = new SelectionModel<User>(true, []);
  userService = inject(UserService);
  ngDestroy$: Subject<void> = new Subject<void>();

  @Input() set source(users: User[]) {
    this._source = users;
    this.dataSource = new MatTableDataSource<User>(users);
    this.dataSource.paginator = this.paginator;
    console.log(this._source);
  }
  get source(): User[] {
    return this._source;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  handleDelete(user: User) {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete your account?'
    );
    userConfirmed &&
      this.userService
        .deleteUserData(user.id)
        .pipe(takeUntil(this.ngDestroy$))
        .subscribe((val) => {
            const index = this.dataSource.data.indexOf(user);
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
            this.dataSource.data;
        });
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

  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}
