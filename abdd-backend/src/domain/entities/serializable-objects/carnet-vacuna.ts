import { VacunaAdministrada } from "./vacuna";

export class CarnetVacuna
{
    constructor(
        public id:string,
        public enfermedad:string,
        public vacunas: VacunaAdministrada[],
    )
    {}
}