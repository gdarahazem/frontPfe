import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ScriptModel} from "./script-model";
import {BddModel} from "./BddModel";

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  constructor(private http: HttpClient) { }

  addScript(formData: FormData): Observable<any> {
    return this.http.post('http://localhost:8090/script', formData);
  }
  getScriptByName(name: string): Observable<ScriptModel> {
    return this.http.get<ScriptModel>('http://localhost:8090/script/nom/' + name);
  }

  getBddList(): Observable<any> {
    return this.http.get('http://localhost:8090/script');
  }
  updateScript(id: number, s: ScriptModel): Observable<void> {
    return this.http.put<void>('http://localhost:8090/script/' + id, s);
  }
}
