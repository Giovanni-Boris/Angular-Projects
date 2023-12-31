import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { FileUploadService } from 'src/app/core/services/file.service';
import { User } from 'src/app/models/user.model';
import { FileUpload } from 'src/app/models/fileUpload.model';
import { selectUserData } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class ShareComponent implements OnInit, OnDestroy {
  @Output() getPosts = new EventEmitter<void>();
  ngDestroyed$ = new Subject<void>();
  userData: User | null = null;
  file: File | null = null;
  desc: string = '';
  fileUrl: string = '';
  timer: NodeJS.Timeout | null = null;
  public constructor(
    private store: Store,
    private uploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectUserData)
      .pipe(takeUntil(this.ngDestroyed$))
      .subscribe((user) => {
        this.userData = user;
      });
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.file = files[0];
      this.fileUrl = URL.createObjectURL(this.file);
    }
  }

  handleSubmit() {
    if (this.file && this.userData) {
      let currentFileUpload: FileUpload = {
        description: this.desc,
        file: this.file,
        userId: this.userData.userId,
      };
      this.uploadService
        .pushFileToStorage(currentFileUpload)
        .pipe(takeUntil(this.ngDestroyed$))
        .subscribe({
          next: (percentage) => {
            //console.log(percentage)
            this.file = null;
            this.desc = '';
          },
          complete: () => {
            //console.log('complete');
            this.getPosts.emit();
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.ngDestroyed$.next();
    this.ngDestroyed$.complete();
  }
}
