import { IsString, IsNumber } from 'class-validator';

export class ReadTutorDto
{
    @IsString()
    readonly nombre:string;

    constructor(nombre)
    {
        this.nombre = nombre;
    }
}