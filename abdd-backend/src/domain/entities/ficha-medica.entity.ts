import { CarnetVacuna } from "./serializable-objects/carnet-vacuna";
import { RevisionMedica } from "./serializable-objects/revision-medica";

export class FichaMedica
{
    constructor(
        private readonly id:string,
        private readonly idMascota:string,
        private revisionesMedica:RevisionMedica[],
        private vacunas: CarnetVacuna[],
    )
    {}

    public getId():string
    {
        return this.id;
    }

    public getIdMascota()
    {
        return this.idMascota;
    }

    public getRevisionesMedica()
    {
        return this.revisionesMedica;
    }

    public getVacunas()
    {
        return this.vacunas;
    }
}