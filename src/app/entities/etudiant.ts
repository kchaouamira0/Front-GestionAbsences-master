
import { Groupe } from "./groupe";
import { ListGroupe } from "./listGroupe";

export class Etudiant {
    id!: number;
    nom! : String ;
    prenom! : String ;
    email! : String ;
    adresse! : String ;
    phone! : String ;
    date_naiss! : String ;
    password! : String ;
    imageUrl ! : String ;
    groupe! : Groupe;
    nbrabs?:number;
}