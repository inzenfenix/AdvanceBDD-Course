import { CreatePacienteUseCase } from 'src/domain/use-cases/create-paciente.usecase';
import { CreatePacienteDto } from 'src/paciente/dto/create-paciente.dto';
import { Injectable } from '@nestjs/common';
import { PacienteRepositoryRegistry } from 'src/paciente/paciente-repo.registry';


@Injectable()
export class PacienteService {
  constructor(private readonly registry: PacienteRepositoryRegistry) {}

  async CreatePaciente(dto: CreatePacienteDto, dbKey:string) {
    const repo = this.registry.get(dbKey);
    const createPaciente = new CreatePacienteUseCase(repo);

    await createPaciente.execute(dto);
  }
}
