import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Etudiant } from '../entities/etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private apiServerUrl ='http://localhost:8081/etudiant';
  constructor(private http : HttpClient) { }

  public getStudents():Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>(`${this.apiServerUrl}/allstudents`);
  }

  public addStudent(etudiant:any):Observable<any> {
        return this.http.post<any>(`${this.apiServerUrl}/signup`,etudiant);
  }

  public updateStudent(etudiant:Etudiant,id :number):Observable<Etudiant>{
    return this.http.put<Etudiant>(`${this.apiServerUrl}/update/${id}`,etudiant);
  }

  public deleteStudent(studentId : number):Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/delete/${studentId}`);

  }


}
