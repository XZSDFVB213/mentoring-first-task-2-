import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private http: HttpClient = inject(HttpClient)
  private baseURL = 'https://jsonplaceholder.typicode.com'

  public getUsers(){
    return this.http.get<[]>(`${this.baseURL}/users`)
  }

}
