import { Etudiant } from "./etudiant";
import { Matiere } from "./matiere";

export class Absence {
    id! : number;
    date_abs! : string;
    etudiant! : Etudiant;
    matiere! : Matiere;
    
}