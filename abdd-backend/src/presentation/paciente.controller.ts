import { Controller, Post, Body } from '@nestjs/common';
import { PacienteService } from 'src/application/services/paciente.service';

@Controller('pacientes')
export class PacienteController
{
    constructor(private readonly service:PacienteService) {}

    @Post()
    create(@Body() dto: {id: string, nombre: string, tutor: string, raza: string, especie: string, edad: Number, genero: string})
    {
        return this.service.CreatePaciente(dto);
    }
}