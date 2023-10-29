import { Component } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent {
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
}
