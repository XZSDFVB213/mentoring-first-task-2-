import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {UserInterface} from "../Interface/user.interface";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {CreateUserComponent} from "../create-user/create-user.component";
import {MatButton} from "@angular/material/button";
import {UsersService} from "../service/users.service";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input()
  user!: UserInterface
  @Output() onClick = new EventEmitter<UserInterface>()
  btnDelClick() {
    this.onClick.emit(this.user);
  }
  public userService = inject(UsersService)
  constructor(private dialog: MatDialog) {}

  openDialog() {
    console.log(this.user)
    const dialogRef = this.dialog.open(CreateUserComponent, {
      data: {id:this.user.id, name: this.user.name ,username: this.user.username , email:this.user.email  }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.onUpdateUser(this.user,result)
    });

  }
  onUpdateUser(user: UserInterface, result: UserInterface) {
    this.userService.updateUser(this.user,result)
  }
}
