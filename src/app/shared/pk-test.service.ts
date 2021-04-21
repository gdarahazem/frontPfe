import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PackageTestModel} from './package-test-model';
import {Observable} from 'rxjs';
import {ProjectModel} from "./project-model";

@Injectable({
  providedIn: 'root'
})
export class PkTestService {

  constructor(private http: HttpClient) { }

  addPk(pkTest: PackageTestModel): Observable<PackageTestModel> {
    return this.http.post<PackageTestModel>('http://localhost:8090/pktest', pkTest);
  }

  pkList(): Observable<PackageTestModel[]> {
    return this.http.get<PackageTestModel[]>('http://localhost:8090/pktest');
  }

  getpk(id: number): Observable<PackageTestModel> {
    return this.http.get<PackageTestModel>('http://localhost:8090/pktest/' + id);
  }

  updatePk(id: number, pk: PackageTestModel): Observable<void> {
    return this.http.put<void>('http://localhost:8090/projects/' + id, pk);
  }
}
