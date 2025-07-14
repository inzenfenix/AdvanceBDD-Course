import { VacunaAdministrada } from "./vacuna";

export class CarnetVacuna
{
    constructor(
        public enfermedad:string,
        public vacunas: VacunaAdministrada[],
    )
    {}
}