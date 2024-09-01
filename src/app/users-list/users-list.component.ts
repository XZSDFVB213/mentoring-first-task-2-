import {Component, inject, OnInit} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {UsersApiService} from "../service/users-api.service";
import {AsyncPipe, JsonPipe, NgClass, NgForOf} from "@angular/common";
import {UserInterface} from "../Interface/user.interface";
import {CreateUserComponent} from "../create-user/create-user.component";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {Dialog} from "@angular/cdk/dialog";
import {LocalStorageService} from "../service/local-storage.service";
import {BehaviorSubject, tap} from "rxjs";
import {UsersService} from "../service/users.service";

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
    MatButtonModule,
    AsyncPipe
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit{
  public userService = inject(UsersService)
  public readonly users$ = this.userService.users$
  readonly dialog = inject(MatDialog);
  public localStorageService = inject(LocalStorageService)
  openDialog() {
    this.dialog.open(CreateUserComponent).afterClosed().pipe(
      tap((result)=>{
        this.onAddUser(result)
      })
    ).subscribe()
  }

  ngOnInit(): void {
    this.userService.loadData()
  }
  onDeleteUser(userN:UserInterface){
    this.userService.deleteUser(userN)
  }
  onAddUser(result:any){
    this.userService.addUser(result)
    console.log('123123123')

  }

}
