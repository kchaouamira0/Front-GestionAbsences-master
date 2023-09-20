import { Matiere } from "./matiere";

export class Enseignant {
    id !: number;
    firstName! : String ;
    lastName! : String ;
    email! : String ; 
    password! : String ;
    imageUrl ! :String;
    matiere! : Matiere;


}