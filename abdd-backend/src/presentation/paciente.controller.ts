import { Controller, Post, Body, Headers } from '@nestjs/common';
import { PacienteService } from 'src/application/services/paciente.service';
import { CreatePacienteDto } from 'src/paciente/dto/create-paciente.dto';

@Controller('pacientes')
export class PacienteController
{
    constructor(private readonly service:PacienteService) {}

    @Post()
    create(@Body() createPacienteDto : CreatePacienteDto, @Headers('db') dbKey:string)
    {
        return this.service.CreatePaciente(createPacienteDto, dbKey);
    }
}