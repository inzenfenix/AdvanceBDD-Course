import { IsString } from "class-validator";

export class ReadMedicoDto
{
    @IsString()
    public readonly nombre:string;

    @IsString()
    public readonly estado:string;

    @IsString()
    public readonly especialidad:string;

    constructor(nombre, estado, especialidad)
    {
        this.nombre = nombre;
        this.estado = estado;
        this.especialidad = especialidad;
    }
}