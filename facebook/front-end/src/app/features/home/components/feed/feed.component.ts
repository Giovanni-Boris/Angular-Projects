import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { selectTokenId } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnDestroy{
  ngDestroyed$ = new Subject();
  userId : number | undefined = undefined
  public constructor(private store: Store){}
  ngOnInit(): void {
    this.store.select(selectTokenId)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((id)=>{
        this.userId = id;
      })
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next("Complete");
    this.ngDestroyed$.complete();
  }

}
