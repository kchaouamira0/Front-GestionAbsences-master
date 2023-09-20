import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginchoiceComponent } from './loginchoice/loginchoice.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EtudiantService } from './services/etudiant.service';
import { EnseignantService } from './services/enseignant.service';
import { LoginComponent } from './login/login.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IndexetudiantComponent } from './indexetudiant/indexetudiant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IndexenseignantComponent } from './indexenseignant/indexenseignant.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    LoginchoiceComponent,
    AdminpageComponent,
    LoginComponent,
    IndexetudiantComponent,
    IndexenseignantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule,NgSelectModule
  ],
  providers: [EtudiantService,EnseignantService],
  bootstrap: [AppComponent]
})
export class AppModule { }
