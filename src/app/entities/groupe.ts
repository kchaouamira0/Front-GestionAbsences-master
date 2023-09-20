
import { Enseignant } from "./enseignant";
import { Etudiant } from "./etudiant";
import { ListGroupe } from "./listGroupe";
import { Matiere } from "./matiere";

export class Groupe{
    id !: number;
    nom_grp ! : ListGroupe ;
   matieres! : Matiere[];
   
    

}