import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Groupe } from '../entities/groupe';
import { Observable } from 'rxjs';
import { Matiere } from '../entities/matiere';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  constructor(private http:HttpClient) { }
  private apiServerUrl ='http://localhost:8081/groupes';
  public getGroupes():Observable<Groupe[]>{
    return this.http.get<Groupe[]>(`${this.apiServerUrl}/allgroups`);
  }

  public addSubjectToGroup(groupid : number,idmatiere:number){
    return this.http.post(`${this.apiServerUrl}/${groupid}/matieres`,idmatiere);
  }

  public addGroupe(groupe : Groupe):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/addgroup`,groupe);
  }
  }

