import { Component } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent {
  file: File | null = null;
  desc : String  = "";
  
  getObjectURL(file: File): string {
    return URL.createObjectURL(file);
  }
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.file = files[0];
    }
  }

  handleSubmit(){

  }
}
