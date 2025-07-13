export class Medico
{
    constructor(
        private readonly id:string,
        private nombre:string,
        private estado:string,
        private especialidad:string
    )
    {}

    public getId():string
    {
        return this.id;
    }

    public getNombre():string
    {
        return this.nombre;
    }

    public getEstado():string
    {
        return this.estado;
    }

    public setEstado(newEstado:string)
    {
        this.estado = newEstado;
    }

    public getEspecialidad()
    {
        return this.especialidad;
    }
}