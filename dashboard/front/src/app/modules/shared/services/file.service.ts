import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private cloudinaryUrl =
    'https://api.cloudinary.com/v1_1/dfsebnkcv/image/upload';
  private uploadPreset = 'uvhmsexk';
  constructor(private http: HttpClient) {}

  uploadSignature(file: File): Observable<any> {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'uvhmsexk');
    return this.http
      .post(this.cloudinaryUrl, data, { headers: { skip: 'true' } })
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
