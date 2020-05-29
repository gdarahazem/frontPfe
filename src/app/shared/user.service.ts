import { Injectable } from '@angular/core';
import {RoleModel} from './role-model';
import {HttpClient} from '@angular/common/http';
import {UserModel} from './user-model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private role: RoleModel = new RoleModel(1, 'testeur', null, null);
  private i: number;

  constructor(private http: HttpClient) {
    // this.users = this.getUsers();
    // console.log(this.getUsers());
  }


  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('http://localhost:8090/users');

  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8090/users/' + id);
  }

  getUserById(id: number): Observable<UserModel> {
    return this.http.get<UserModel>('http://localhost:8090/users/' + id);
  }

  addUser(user: UserModel): Observable<any> {
    return this.http.post(
      'http://localhost:8090/users', user
    );
  }

  updateUser(id: number, user: UserModel): Observable<void> {
    return this.http.put<void>('http://localhost:8090/users/' + id, user);
  }

  verifyRole(login: string, mdp: string): Observable<UserModel> {
    return this.http.post<UserModel>('http://localhost:8090/userss/' + login,
      mdp
    );
  }
}
