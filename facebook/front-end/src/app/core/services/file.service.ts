import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { concatMap, finalize } from 'rxjs/operators';
import { FileUpload } from 'src/app/models/fileUpload.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/images';

  constructor(
    private storage: AngularFireStorage,
    private userService: UserService
  ) {}

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${
      new Date().getTime() + fileUpload.file.name
    }`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef
            .getDownloadURL()
            .pipe(
              concatMap((downloadURL) =>
                this.userService.createPost({
                  description: fileUpload.description,
                  userId: fileUpload.userId,
                  img: downloadURL,
                })
              )
            )
            .subscribe();
            //console.log(post);
            
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }
}
