import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BddModel} from './BddModel';

@Injectable({
  providedIn: 'root'
})
export class BddService {

  constructor(private http: HttpClient) {

  }
  getBddByName(name: string): Observable<BddModel> {
    return this.http.get<BddModel>('http://localhost:8090/bdd/nom/' + name);
  }
  addBdd(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8090/bdd', formData);
  }

  getBddList(): Observable<any> {
    return this.http.get('http://localhost:8090/bdd');
  }
  updateBdd(id: number, b: BddModel): Observable<void> {
    return this.http.put<void>('http://localhost:8090/bdd/' + id, b);
  }
}
