import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { selectUserData } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit,OnDestroy {
  public ngDestroyed$ = new Subject();
  public userData: User | null = null;
  public constructor(private store: Store){}


  ngOnInit(): void {
    this.store.select(selectUserData)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((user)=>{
        this.userData = user;
      })
  }
  file: File | null = null;
  desc : String  = "";
  fileUrl : string =  "";

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.file = files[0];
      this.fileUrl = URL.createObjectURL(this.file)
    }
  }
  

  handleSubmit(){
    console.log(this.file,this.desc);
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
