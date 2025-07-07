export class Paciente
{
    constructor(
        public readonly id:string,
        public nombre:string,
        public tutor:string,
        public raza:string,
        public edad:Number,
        public especie:string,
        public genero:string
    )
    {}
}