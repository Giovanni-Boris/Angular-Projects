import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { User } from '../../../shared/interfaces/user.model';

export interface PeriodicElement {
  id: number;
  username: string;
  img: string;
  status: string;
  email: string;
  age: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    username: 'Snow',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    status: 'active',
    email: '1snow@gmail.com',
    age: 35,
  },
  {
    id: 2,
    username: 'Jamie Lannister',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '2snow@gmail.com',
    status: 'passive',
    age: 42,
  },
  {
    id: 3,
    username: 'Lannister',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '3snow@gmail.com',
    status: 'pending',
    age: 45,
  },
  {
    id: 4,
    username: 'Stark',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '4snow@gmail.com',
    status: 'active',
    age: 16,
  },
  {
    id: 5,
    username: 'Targaryen',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '5snow@gmail.com',
    status: 'passive',
    age: 22,
  },
  {
    id: 6,
    username: 'Melisandre',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '6snow@gmail.com',
    status: 'active',
    age: 15,
  },
  {
    id: 7,
    username: 'Clifford',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '7snow@gmail.com',
    status: 'passive',
    age: 44,
  },
  {
    id: 8,
    username: 'Frances',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: '8snow@gmail.com',
    status: 'active',
    age: 36,
  },
  {
    id: 9,
    username: 'Roxie',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'snow@gmail.com',
    status: 'pending',
    age: 65,
  },
  {
    id: 10,
    username: 'Roxie',
    img: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    email: 'snow@gmail.com',
    status: 'active',
    age: 65,
  },
];
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

  @Input() set source(users: User[]) {
    this._source = users;
    this.dataSource = new MatTableDataSource<User>(users);
    this.dataSource.paginator = this.paginator;
    console.log(this._source)
  }
  get source(): User[] {
    return this._source;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  handleDelete(id: User) {
    const index = this.dataSource.data.indexOf(id);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    this.dataSource.data;
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
