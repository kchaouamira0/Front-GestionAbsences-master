import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Absence } from '../entities/absence';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {
  private apiServerUrl ='http://localhost:8081/absences';
  constructor(private http : HttpClient) { }

  public addAbsence(date :String , etudiantId :number,matId:number):Observable<any>{
    return this.http.post<any>("http://localhost:8081/absences/addabsence?date="+date+"&etudiantId="+etudiantId+"&matId="+matId,{});
  }

  public getEtudiantAbsences(etudiantId:number):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/etudiant/${etudiantId}`);
  }

  public nbrAbsencesEtudMat(etudiantId:number,matId:number):Observable<any>{
    return this.http.get(`${this.apiServerUrl}/absencesetud/${etudiantId}/matiere/${matId}`);
  }
}
