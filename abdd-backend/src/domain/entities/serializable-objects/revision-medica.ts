import { Procedimiento } from "./procedimiento";

export class RevisionMedica
{
    peso:Number;
    presion:Number;
    temperatura:Number;
    fechaHora:Date;
    idMedico:string;
    costo:string;
    pagado:Boolean;
    procedimientos: Procedimiento[]
}