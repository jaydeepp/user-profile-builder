import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = 'https://ng-recipe-book-ca1b8.firebaseio.com/user.json';

  constructor(private httpClient: HttpClient) { }

  create(user: FormData) {
    return this.httpClient.put<User>(this.api, user);
  }

  read(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.api}/${id}`)
  }

  list(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.api);
  }

  delete(id: string) {
    return this.httpClient.delete(`${this.api}/${id}`)
  }
}
