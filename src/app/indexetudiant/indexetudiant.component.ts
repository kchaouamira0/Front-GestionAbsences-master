import { Component, OnInit } from '@angular/core';
import { Etudiant } from '../entities/etudiant';
import { Absence } from '../entities/absence';
import { AbsenceService } from '../services/absence.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-indexetudiant',
  templateUrl: './indexetudiant.component.html',
  styleUrls: ['./indexetudiant.component.css']
})
export class IndexetudiantComponent implements OnInit{
constructor(private absenceService:AbsenceService,private authentifService:AuthentificationService){};
    currentUser : any ; 
    listAbsences : Absence[] = [];
    
  ngOnInit(): void {
    this.getEtudiant();
    
    this.absenceService.getEtudiantAbsences(this.currentUser.id).subscribe(
      (response: Absence[]) => {
        console.log(response);
        this.listAbsences=response;
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

  getEtudiant(){
    const user = localStorage.getItem('user');
    if(user){
    this.currentUser =  JSON.parse(user);
    }
  }

  logout(){
    this.authentifService.logout();

  }


}
