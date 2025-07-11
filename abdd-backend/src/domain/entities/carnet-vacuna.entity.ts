import { VacunaAdministrada } from "./serializable-objects/Vacuna";

export class CarnetVacuna
{
    constructor(
        public id:string,
        public idPaciente:string,
        public enfermedad:string,
        public nombrePaciente:string,
        public vacunas: VacunaAdministrada[],
    )
    {}
}