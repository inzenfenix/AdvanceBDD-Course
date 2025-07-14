import { Medicamento } from "./medicamento";

export class Procedimiento
{
    public id:string;
    public idMedicos:string[];
    public procedimiento: string;
    public medicamentos: Medicamento[];
}