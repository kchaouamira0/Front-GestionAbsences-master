import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enseignant } from '../entities/enseignant';
import { ListGroupe } from '../entities/listGroupe';
import { Etudiant } from '../entities/etudiant';
import { Groupe } from '../entities/groupe';
@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  private apiServerUrl ='http://localhost:8081/enseignant';
  constructor(private http : HttpClient) {}

  public getProfs():Observable<Enseignant[]>{
    return this.http.get<Enseignant[]>(`${this.apiServerUrl}/allprofs`);
  }

  public getProfById(id :number):Observable<Enseignant>{
    return this.http.get<Enseignant>(`${this.apiServerUrl}/${id}`);
  }
  public addProf(enseignant:Enseignant):Observable<Enseignant> {
    return this.http.post<Enseignant>(`${this.apiServerUrl}/addprof`,enseignant);
  }

  public updateProf(enseignant:Enseignant,id :number):Observable<Enseignant>{
    return this.http.put<Enseignant>(`${this.apiServerUrl}/updateprof/${id}`,enseignant);

  }

  public deleteProf(id : number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/deleteprof/${id}`);
  }

  public listOfStudents(id:number):Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>(`${this.apiServerUrl}/${id}/students`);
  }

  public addGroupeToEnseignant(enseignantId : number , groupeId : number):Observable<any>{
    return this.http.post<any>(`${this.apiServerUrl}/${enseignantId}/groupes`,groupeId);
  }

  public getProfGroups(enseignantId : number):Observable<Groupe[]>{
    return this.http.get<Groupe[]>(`${this.apiServerUrl}/${enseignantId}/groupes`);
  }

  public getStudentsByGroup(enseignantId : number , groupeId : number):Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>(`${this.apiServerUrl}/${enseignantId}/groupes/${groupeId}/students`);
  }


  public getPossibleGroups(enseignantId : number ):Observable<any>{
    return this.http.get<any>(`${this.apiServerUrl}/${enseignantId}/groupeposs`);
  }

  public addGroupesToEnseignant(id:Number,idGrps:Number[]){
    return this.http.post(`${this.apiServerUrl}/${id}/addgrouposs`,idGrps);
  }

  

}
