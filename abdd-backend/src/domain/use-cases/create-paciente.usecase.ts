import { IPacienteRepository } from '../repositories/paciente.repository';
import { Paciente } from '../entities/paciente.entity';

export class CreatePacienteUseCase {
  constructor(private readonly pacienteRepo: IPacienteRepository) {}

  async execute(input: {
    id: string;
    nombre: string;
    tutor: string;
    raza: string;
    especie: string;
    edad: Number;
    genero: string;
  }) {
    const paciente = new Paciente(
      input.id,
      input.nombre,
      input.tutor,
      input.raza,
      input.edad,
      input.especie,
      input.genero,
    );

    await this.pacienteRepo.CreatePaciente(paciente);
  }
}
