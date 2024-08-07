import {inject, Injectable} from '@angular/core';
import {UsersApiService} from "./users-api.service";
import {UserInterface} from "../Interface/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersApiService = inject(UsersApiService);
  private users = []

  constructor() {
    this.usersApiService.getUsers().subscribe((res =>{
      this.users = res
    }))
  }
}
