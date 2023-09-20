import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginchoiceComponent } from './loginchoice/loginchoice.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { LoginComponent } from './login/login.component';
import { IndexetudiantComponent } from './indexetudiant/indexetudiant.component';
import { IndexenseignantComponent } from './indexenseignant/indexenseignant.component';

const routes: Routes = [
  {path:'home' ,component:LoginchoiceComponent},
  {path:'',component:LoginchoiceComponent},
  {path:'adminpage',component:AdminpageComponent},
  {path:'login', component:LoginComponent},
  {path:'etudiant',component:IndexetudiantComponent},
  {path:'enseignant',component:IndexenseignantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
