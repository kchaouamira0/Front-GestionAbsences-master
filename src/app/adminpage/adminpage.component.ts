import { Component, OnInit } from '@angular/core';
import { EtudiantService } from '../services/etudiant.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Etudiant } from '../entities/etudiant';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { ListGroupe } from '../entities/listGroupe';
import { Enseignant } from '../entities/enseignant';
import { Matiere } from '../entities/matiere';
import { MatiereService } from '../services/matiere.service';
import { Observable } from 'rxjs';
import { EnseignantService } from '../services/enseignant.service';
import { Groupe } from '../entities/groupe';
import { GroupeService } from '../services/groupe.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  
  public selectedgroupe :String="";
  public matieres : Matiere[]= [];
  public enseignants : Enseignant[] = [];
  public etudiants: Etudiant[] = [];
  public filtredetudiants: Etudiant[] = [];
  public editEtudiant: Etudiant = { id: 3, nom: 'a', prenom: 'aaa', email: "aaaa", phone: "aaaa", password: "aa", adresse: "aa", groupe:{id:1,nom_grp:ListGroupe.INF_1_A,matieres:[]}, date_naiss: "" ,imageUrl:""};
  public deleteEtudiant: Etudiant = { id: 3, nom: 'a', prenom: 'aaa', email: "aaaa", phone: "aaaa", password: "aa", adresse: "aa",groupe:{id:1,nom_grp:ListGroupe.INF_1_A,matieres:[]} , date_naiss: "" ,imageUrl:""};
  public editEnseignant : Enseignant = {id :3,firstName:"aaa",lastName:"aaaa",email:"aaa",password:"az",imageUrl:"",matiere:{id:1,libelle:"physique"}};
  public deleteEnseignant : Enseignant = {id :3,firstName:"aaa",lastName:"aaaa",email:"aaa",password:"az",imageUrl:"",matiere:{id:1,libelle:"physique"}};
  public enseignant : Enseignant = new Enseignant();
  public etudiant : Etudiant = new Etudiant();
  listGroupe : Groupe[] = [];
  public defaulSelectvalue :String = "INF_1_A";
  public  filtredProfs : Enseignant[]=[];
  public selectedmatiere : String = "";
  groupeselectionne :Groupe[]=[];
  listGroupes : Groupe[]=[];
  public editMatiere : Matiere = new Matiere();
  groupe : Groupe = new Groupe();
 
  
  constructor(private etudiantService: EtudiantService,private enseignantService: EnseignantService,private matiereService:MatiereService,private groupeService:GroupeService,private formBuilder: FormBuilder,private loginService:AuthentificationService) { }
  editGroupe : Groupe = {id:1,nom_grp:ListGroupe.INF_1_A,matieres:[]}
  addMatiereForm!: FormGroup;
  
  ngOnInit(): void {
    this.getStudents();
    this.getProfs();
    this.getGroups();
    this.getMatieres();
    this.addMatiereForm = this.formBuilder.group({
      matiere: ['', Validators.required]
    
    
  });}
  onFilterStudents(groupe : String ){
    
    this.filtredetudiants=this.etudiants.filter((etudiant)=>etudiant.groupe.nom_grp==groupe);
  }
  onFilterProfs(matiere : String){
    this.filtredProfs=this.enseignants.filter((enseignant)=>enseignant.matiere.libelle==matiere);
  }

     public getMatieres(): void {
    this.matiereService.getMatieres().subscribe(
      (response: Matiere[]) => {
        this.matieres = response;
        console.log(this.matieres);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  public getGroups(): void {
    this.groupeService.getGroupes().subscribe(
      (response: Groupe[]) => {
        this.listGroupe = response;
        console.log(this.listGroupe);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  

  public getStudents(): void {
    this.etudiantService.getStudents().subscribe(
      (response: Etudiant[]) => {
        this.etudiants = response;
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getProfs(): void {
    this.enseignantService.getProfs().subscribe(
      (response: Enseignant[]) => {
        this.enseignants = response;
        console.log(this.etudiants);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenStudentModal(etudiant: Etudiant, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addStudentModal');
    }
    if (mode === 'edit') {
      this.editEtudiant = etudiant;
      button.setAttribute('data-target', '#updateEtudiantModal');
    }
    if (mode === 'delete') {
      this.deleteEtudiant = etudiant;
      button.setAttribute('data-target', '#deleteStudentModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddStudent(addForm: NgForm): void {
   
    this.etudiantService.addStudent(addForm.value).subscribe(
      (response: Etudiant) => {
        console.log(response);
         addForm.reset();
        location.reload();
 
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
        location.reload();
      }
    );
  }
  
  public onDeleteStudent(studentId: number): void {
    this.etudiantService.deleteStudent(studentId).subscribe(
      (response: void) => {
        
        this.getStudents();
        location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateStudent(etudiant:Etudiant ,studentId:number): void {
    this.etudiantService.updateStudent(this.editEtudiant,studentId).subscribe(
      (response: Etudiant) => {
        console.log(response);
        this.getStudents();
        location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  

  public onOpenProfModal(enseignant: Enseignant, mode: string): void {
    const container = document.getElementById('prof-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProfModal');
    }
    if (mode === 'edit') {
      this.editEnseignant = enseignant;
      button.setAttribute('data-target', '#updateProfModal');
    }
    if (mode === 'delete') {
      this.deleteEnseignant = enseignant;
      button.setAttribute('data-target', '#deleteProfModal');
    }
    if (mode === 'addgroup') {
      this.editEnseignant = enseignant;
      button.setAttribute('data-target', '#addgrpProfModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddProf(addprofForm: NgForm): void {
    this.enseignantService.addProf(addprofForm.value).subscribe(
      (response: Enseignant) => {
        console.log(response);
        addprofForm.reset();
        location.reload();
        console.log(addprofForm.value());
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addprofForm.reset();
        location.reload();
      }
    );
  }

  public onDeleteProf(profId: number): void {
    this.enseignantService.deleteProf(profId).subscribe(
      (response: void) => {
        
        this.getProfs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateProf(enseignant:Enseignant ,enseignantId:number): void {
    this.enseignantService.updateProf(this.editEnseignant,enseignantId).subscribe(
      (response: Enseignant) => {
        console.log(response);
        this.getProfs();
        location.reload();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  /*public getPossibleGroupes(enseignantId:number):void {
    this.onOpenProfModal(this.enseignant, 'addgroup') ;
    this.enseignantService.getPossibleGroups(enseignantId).subscribe((response:Groupe[])=>{
        this.listGroupes=response;
        console.log(this.listGroupes);
     },
     (error :HttpErrorResponse)=>{
      alert(error.message);
     }
     );
     this.enseignantService.getProfById(enseignantId).subscribe((response:Enseignant)=>{
      this.enseignant=response;
     });
    }*/
    groupeSelectionnee:Groupe[]=[];
    listGroupeofEns:Groupe[]=[];
    AffectGroupesToEns(id:number){
      this.onOpenProfModal(this.enseignant,'addgroup');
      this.enseignantService.getPossibleGroups(id).subscribe(data=>{
       this.listGroupeofEns=data;
      console.log(this.listGroupeofEns);
      })
        
       this.enseignantService.getProfById(id).subscribe(data=>{
           this.enseignant=data;
         
         })
       }

   

    
  
    onAttribueGrps(){
      const EnsID=this.enseignant.id;
     // console.log(EnsID);
      const GroupeIds=this.groupeSelectionnee.map(groupe=>groupe.id);
      this.enseignantService.addGroupesToEnseignant(EnsID,GroupeIds).subscribe(data=>{
        console.log("succes well done");
        location.reload();
      },error=>{console.log(error)})
      
    }

    public onOpenSubjectModal(matiere: Matiere, mode: string): void {
      const container = document.getElementById('subject-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addSubjectModal');
      }
      
      container?.appendChild(button);
      button.click();
    }
    onAddSubject(addsubjectForm:NgForm){
      this.matiereService.addMatiere(addsubjectForm.value).subscribe(
        (response: Matiere) => {
          console.log(response);
          addsubjectForm.reset();
          location.reload();
          console.log(addsubjectForm.value());
          
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addsubjectForm.reset();
          location.reload();
        }
      );
    }
    public onOpenSubjectGrpModal(groupe: Groupe, mode: string): void {
      const container = document.getElementById('group-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        this.editGroupe = groupe;
        button.setAttribute('data-target', '#addsubjecttogroup');
      }
      
      container?.appendChild(button);
      button.click();
    }


    onAddSubjectToGroup(addsubjectToGroupForm:NgForm){
      this.groupeService.addSubjectToGroup(this.editGroupe.id,addsubjectToGroupForm.value).subscribe(
        (response: any) => {
          console.log(response);
          addsubjectToGroupForm.reset();
          location.reload();
          console.log(addsubjectToGroupForm.value());
          
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addsubjectToGroupForm.reset();
          location.reload();
        }
      );
    }
    
  onAddMatiere(groupeId : number) {
     // replace with the actual group ID
    const matiereId = this.addMatiereForm.value.matiere;
    this.groupeService.addSubjectToGroup(groupeId, matiereId).subscribe(() => {
      console.log("success");
      location.reload();
    }, () => {
      
    });
  }
  logout(){
    this.loginService.logout();

  }


  public onOpenGroupGrpModal(groupe: Groupe, mode: string): void {
    const container = document.getElementById('group-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      this.editGroupe = groupe;
      button.setAttribute('data-target', '#addGroupModal');
    }
    
    container?.appendChild(button);
    button.click();
  }

  onAddGroup(addgroupForm:NgForm){
    this.groupeService.addGroupe(addgroupForm.value).subscribe(
      (response: Etudiant) => {
        console.log(response);
        addgroupForm.reset();
        location.reload();
 
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addgroupForm.reset();
        location.reload();
      }
    );
  }
}
    

    
    
  
  
    
 

