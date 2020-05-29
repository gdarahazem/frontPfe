import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProjectModel} from './project-model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) {  }

  getAllProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>('http://localhost:8090/projects');
  }

  addProject(p: ProjectModel): Observable<ProjectModel> {
    return this.http.post<ProjectModel>('http://localhost:8090/projects', p);
  }

  getProject(id: number): Observable<ProjectModel> {
    return this.http.get<ProjectModel>('http://localhost:8090/projects/' + id);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8090/projects/' + id);
  }
}
