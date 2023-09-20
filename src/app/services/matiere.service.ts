import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matiere } from '../entities/matiere';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {
  private apiServerUrl ='http://localhost:8081/matiere';
  constructor(private http:HttpClient) { }
  public getMatieres():Observable<Matiere[]>{
    return this.http.get<Matiere[]>(`${this.apiServerUrl}/allsubjects`);
  }

  public addMatiere(matiere:Matiere):Observable<Matiere>{
    return this.http.post<Matiere>(`${this.apiServerUrl}/addsubject`,matiere);
  }
  
}
