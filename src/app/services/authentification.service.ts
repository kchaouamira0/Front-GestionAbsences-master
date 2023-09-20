import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etudiant } from '../entities/etudiant';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private apiServerUrl ='http://localhost:8081/login';
  constructor(private http : HttpClient,private router:Router) { }

  /*login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiServerUrl, { email: email, password: password }).pipe(
      tap(response => {
        // Check if the response contains an etudiant or enseignant object
        if (response.etudiant) {
          return { type: 'etudiant', user: response.etudiant };
        } else if (response.enseignant) {
          return { type: 'enseignant', user: response.enseignant };
        } else {
          return null;
        }
      })
    );
  }*/

  public logout(){
    localStorage.clear();
    this.router.navigate(['/home']);
  }
}