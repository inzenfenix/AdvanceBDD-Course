import { Procedimiento } from "./procedimiento";

export class RevisionMedica
{
    public id:string;
    public peso:Number;
    public presion:Number;
    public temperatura:Number;
    public fechaHora:Date;
    public idMedico:string;
    public costo:Number;
    public pagado:Boolean;
    public procedimientos: Procedimiento[]
}