import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogClose,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent   {
  // myForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
  ) {}
  data = inject(MAT_DIALOG_DATA)
  public newForm= new FormGroup({
      id: new FormControl(this?.data?.id , [Validators.required, Validators.min(1)]),
      name: new FormControl(this?.data?.name, [Validators.required, Validators.minLength(3)]),
      username: new FormControl(this?.data?.username, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(this?.data?.email, [Validators.required, Validators.email]),
  })
  onSubmit(){
    if (this.newForm.valid) {
    console.log(this.newForm.value);
  }}
}
