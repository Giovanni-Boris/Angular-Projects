import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

const formFields = [
    { id: 1, label: 'Username', type: 'text', placeholder: 'john_doe' },
    { id: 2, label: 'Name and surname', type: 'text', placeholder: 'John Doe' },
    { id: 3, label: 'Email', type: 'mail', placeholder: 'john_doe@gmail.com' },
    { id: 4, label: 'Phone', type: 'text', placeholder: '+1 234 567 89' },
    { id: 5, label: 'Password', type: 'password' },
    { id: 6, label: 'Address', type: 'text', placeholder: 'Elton St. 216 NewYork' },
    { id: 7, label: 'Country', type: 'text', placeholder: 'USA' },
  ];
@Component({
  selector: 'app-new-user-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './new-user-page.component.html',
  styleUrl: './new-user-page.component.scss'
})
export class NewUserPageComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  readonly formFields = formFields;
  readonly title ="Add New User";
  userForm: FormGroup;
  constructor(){
    const formControls: { [key: string]: any } = {};
    this.formFields.forEach((field) => {
      formControls[field.label] = [null, Validators.required];
    });
    this.userForm = this.formBuilder.group(formControls);
  }
  file : File | null = null;
  fileUrl: string = '';

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.file = files[0];
      this.fileUrl = URL.createObjectURL(this.file);
    }
  }
  onSubmit(){
    console.log(this.userForm);
  }
}
