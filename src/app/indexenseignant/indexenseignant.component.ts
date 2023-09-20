import { Component } from '@angular/core';
import { EnseignantService } from '../services/enseignant.service';
import { Etudiant } from '../entities/etudiant';
import { HttpErrorResponse } from '@angular/common/http';
import { Groupe } from '../entities/groupe';
import { GroupeService } from '../services/groupe.service';
import { Absence } from '../entities/absence';
import { NgForm } from '@angular/forms';
import { AbsenceService } from '../services/absence.service';
import { AuthentificationService } from '../services/authentification.service';
import { Observable, catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-indexenseignant',
  templateUrl: './indexenseignant.component.html',
  styleUrls: ['./indexenseignant.component.css']
})
export class IndexenseignantComponent {
  constructor(private enseignantService : EnseignantService , private groupeService:GroupeService ,private absenceService:AbsenceService,private authentifService:AuthentificationService){};
  absence : Absence = new Absence();
  nbrabs : number = 0;
  etudiantsList:Etudiant[]=[];
  onFilterStudents(groupe : String ){
    
    this.filtredetudiants=this.listOfStudents.filter((etudiant)=>etudiant.groupe.nom_grp==groupe);
    this.nbretudiantabs();
  }
  currentUser : any ; 
    selectedgroupe : String = "";
    listgroupes : Groupe [] = [];
    public listOfStudents : Etudiant[] = [];
    filtredetudiants : Etudiant[] = [];
  ngOnInit(): void {
    this.getEnseignant();
    this.getListOfStudents()
    this.getProfGroups();
    console.log(this.currentUser.matiere.libelle);
    
    
    
  }

  getEnseignant(){
    const user = localStorage.getItem('user');
    if(user){
    this.currentUser =  JSON.parse(user);
    }
  }
  public getListOfStudents(): void {
    this.enseignantService.listOfStudents(this.currentUser.id).subscribe(
      (response:any) => {
        this.listOfStudents = response;
        console.log(this.listOfStudents);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getProfGroups(): void {
    this.enseignantService.getProfGroups(this.currentUser.id).subscribe(
      (response: Groupe[]) => {
        this.listgroupes = response;
        console.log(this.listgroupes);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  selectedStudentId!:number;
  onOpenAbsenceModal(studenId:number ,mode:String){
    const container = document.getElementById('absence-container');
    const button = document.createElement('button');
    button.type = 'button';
    this.selectedStudentId =studenId;
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addabsence');
    }
    container?.appendChild(button);
    button.click();
    
  }
  
  date_abs : String = "";
  
  onAddAbsence(){
    
    this.absenceService.addAbsence(this.date_abs,this.selectedStudentId,this.currentUser.matiere.id).subscribe(
      (response: Absence) => {
        console.log(response);
        
        location.reload();
        
        
      })

  }

  /*nbrAbsences(etudiant:any):any{
    
    this.absenceService.nbrAbsencesEtudMat(etudiant.id,this.currentUser.matiere.id).subscribe(
      (response:any) => {
       console.log(response);
        return response;
      },
      (error: any) => {
        console.error(error);
        return error;
      }
    );
  }*/

  nbrabsences(etudiantId:number):void{
   
    console.log(etudiantId);
     this.absenceService.nbrAbsencesEtudMat(etudiantId,this.currentUser.matiere.id).subscribe((data:number)=>{
      
     
      this.nbrabs = data;
      console.log(data);
      
     });
    
   

  }
  
  nbretudiantabs(){
   console.log(this.nbrabs);
    this.filtredetudiants= this.filtredetudiants.map(e=>{
      this.absenceService.nbrAbsencesEtudMat(e.id,this.currentUser.matiere.id).subscribe((data:any)=>{
        e.nbrabs=data;
        console.log(e);
        
      })
      
      return e;
    })
  }
          

  logout(){
    this.authentifService.logout();

  }


}





  
  /*onFilterStudents(groupe : Groupe ){
    
    this.filtredetudiants=this.listOfStudents.filter((etudiant)=>etudiant.idg==groupe.id);
  }*/


 


