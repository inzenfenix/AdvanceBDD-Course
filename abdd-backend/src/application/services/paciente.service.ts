import { CreatePacienteUseCase } from 'src/domain/use-cases/create-paciente.usecase';
import { IPacienteRepository } from 'src/domain/repositories/paciente.repository';

export class PacienteService {
  private createPaciente: CreatePacienteUseCase;

  constructor(private readonly repo: IPacienteRepository) {
    this.createPaciente = new CreatePacienteUseCase(repo);
  }

  async CreatePaciente(input: {
    id: string;
    nombre: string;
    tutor: string;
    raza: string;
    especie: string;
    edad: Number;
    genero: string;
  }) {
    await this.createPaciente.execute(input);
  }
}
