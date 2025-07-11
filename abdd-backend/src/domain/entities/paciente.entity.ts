export class Paciente
{
    constructor(
        private readonly id:string,
        private readonly tutor:string,
        private nombre:string,
        private raza:string,
        private edad:Number,
        private especie:string,
        private genero:string
    )
    {}

    public getId():string
    {
        return this.id;
    }

    public getTutor():string
    {
        return this.tutor;
    }

    public getNombre():string
    {
        return this.nombre;
    }

    public getRaza():string
    {
        return this.raza;
    }

    public getEdad():Number
    {
        return this.edad;
    }

    public getEspecie():string
    {
        return this.especie;
    }

    public getGenero():string
    {
        return this.genero;
    }
}