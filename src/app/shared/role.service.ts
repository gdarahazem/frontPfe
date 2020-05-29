import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoleModel} from './role-model';
import {ProjectModel} from "./project-model";
import {UserModel} from "./user-model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) { }


  getRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>('http://localhost:8090/roles');
  }
  getRole(id: number): Observable<RoleModel> {
    return this.http.get<ProjectModel>('http://localhost:8090/roles/' + id);
  }

  updateRole(id: number, role: RoleModel): Observable<void> {
    return this.http.put<void>('http://localhost:8090/roles/' + id, role);
  }
}
