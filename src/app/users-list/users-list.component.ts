import {Component, inject} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {UsersApiService} from "../service/users-api.service";
import {JsonPipe, NgClass, NgForOf} from "@angular/common";
import {UserInterface} from "../Interface/user.interface";
import {CreateUserComponent} from "../create-user/create-user.component";
import {MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {Dialog} from "@angular/cdk/dialog";
import {LocalStorageService} from "../service/local-storage.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    JsonPipe,
    NgForOf,
    NgClass,
    CreateUserComponent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  private readonly usersApiService = inject(UsersApiService)
  public users:UserInterface[] = []

  constructor() {
    this.usersApiService.getUsers().subscribe(
      res => this.users = res
    )
    console.log(this.users)
  }

  public deleteUser(userN:UserInterface):void{
    console.log(this.users)
    this.users = this.users.filter(user=> userN.id !== user.id)
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(CreateUserComponent).afterClosed().pipe(
      tap((result)=>{
        this.addUser(result)
      })
    ).subscribe()
  }
  public addUser(myForm:any){
    this.users.push(myForm)
    console.log("Hello. It's work")
  }
}
