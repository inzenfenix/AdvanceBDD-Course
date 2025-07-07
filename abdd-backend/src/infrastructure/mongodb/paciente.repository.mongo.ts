import { IPacienteRepository } from 'src/domain/repositories/paciente.repository';
import { Paciente } from 'src/domain/entities/paciente.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export class MongoPacienteRepository implements IPacienteRepository {
  constructor(@InjectModel('Paciente') private pacienteModel: Model<any>) {}

  async CreatePaciente(paciente: Paciente): Promise<void> {
    await new this.pacienteModel({
      _id: paciente.id,
      nombre: paciente.nombre,
      tutor: paciente.tutor,
      raza: paciente.raza,
      edad: paciente.edad,
      especie: paciente.especie,
      genero: paciente.genero,
    }).save();
  }
  async FindById(id: string): Promise<Paciente | null> {
    const doc = await this.pacienteModel.findById(id).exec();
    return doc
      ? new Paciente(
          doc._id,
          doc.nombre,
          doc.tutor,
          doc.raza,
          doc.edad,
          doc.especie,
          doc.genero,
        )
      : null;
  }
  async UpdatePaciente(paciente: Paciente): Promise<void> {
    await this.pacienteModel.findByIdAndUpdate(paciente.id, {
      nombre: paciente.nombre,
      tutor: paciente.tutor,
      raza: paciente.raza,
      edad: paciente.edad,
      especie: paciente.especie,
      genero: paciente.genero,
    });
  }
  async DeletePaciente(id: string): Promise<string> {
    const query = await this.pacienteModel.deleteOne({ _id: id });

    if (query.deletedCount == 1) return 'Patient removed';
    else return "Couldn't find patient to remove";
  }
}
