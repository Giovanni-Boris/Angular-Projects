import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from '../../../shared/components/chart/chart.component';
import { TableComponent } from '../../../shared/components/table/table.component';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../shared/interfaces/user.model';
import { Subject, map, switchAll, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-single-user-page',
  standalone: true,
  imports: [CommonModule, ChartComponent, TableComponent],
  templateUrl: './single-user-page.component.html',
  styleUrl: './single-user-page.component.scss',
})
export class SingleUserPageComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  actualUser: User | undefined;
  ngDestroy$ = new Subject<void>();
  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['userId']),
        switchMap((userId) => this.userService.getUserData(userId)),
        takeUntil(this.ngDestroy$)
      )
      .subscribe((user) => {
        this.actualUser = user;
      });
  }
  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
