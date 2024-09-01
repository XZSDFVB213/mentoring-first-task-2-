import {inject, Injectable} from '@angular/core';
import {UsersApiService} from "./users-api.service";
import {UserInterface} from "../Interface/user.interface";
import {BehaviorSubject} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersApiService = inject(UsersApiService)
  private usersSubject = new BehaviorSubject<UserInterface[]>([]);
  public readonly users$ = this.usersSubject.asObservable()
  public localStorage = inject(LocalStorageService)

  loadUser():void {
    this.usersApiService.getUsers().subscribe((res:UserInterface[]) =>{
      this.usersSubject.next(res)
    })
  }
  public deleteUser(userN:UserInterface):void{
    this.usersSubject.next(this.usersSubject.value.filter(user=> userN.id !== user.id))
    this.saveData()
  }
  public addUser(result:UserInterface){
    this.usersSubject.next([...this.usersSubject.value,result])
    this.saveData()
    return this.usersSubject
  }

  public updateUser(user:UserInterface,result:UserInterface){
      user.id = result?.id ? result.id :user.id;
      user.name = result?.name ? result.name :user.name;
      user.username = result?.username ? result.username : user.username;
      user.email = result?.email ? result.email : user.email;
      this.saveData()

  }
  saveData() {
    this.localStorage.saveArray('userArray', this.usersSubject.value);
  }
  loadData() {
    const storedArray = this.localStorage.getArray('userArray')
    this.usersSubject.next(storedArray);
    console.log(storedArray)
    if (storedArray.length <= 0){
      this.loadUser()
    }
  }
}
