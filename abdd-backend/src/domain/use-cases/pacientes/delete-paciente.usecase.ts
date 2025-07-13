import { IPacienteRepository } from '../../repositories/paciente.repository';
import { DeletePacienteDto } from 'src/presentation/paciente/dto/delete-paciente.dto';

export class DeletePacienteUseCase {
  constructor(private readonly pacienteRepo: IPacienteRepository) {}

  async execute(dto: DeletePacienteDto) {

    //TODO: Add delete from tutor database
    await this.pacienteRepo.DeletePaciente(dto.id);
  }
}
