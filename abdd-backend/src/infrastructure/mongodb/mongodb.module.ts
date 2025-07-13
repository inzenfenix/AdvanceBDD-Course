import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PacienteSchema } from './schemas/paciente.schema';
import { MongoPacienteRepository } from './paciente.repository.mongo';
import { TutorMongoRepository } from './tutor.repository.mongo';
import { TutorSchema } from './schemas/tutor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Paciente', schema: PacienteSchema },
      { name: 'Tutor', schema: TutorSchema },
    ]),
  ],
  providers: [MongoPacienteRepository, TutorMongoRepository],
  exports: [MongoPacienteRepository, TutorMongoRepository],
})
export class MongoDBModule {}
