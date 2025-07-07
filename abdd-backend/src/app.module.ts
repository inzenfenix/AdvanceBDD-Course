import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBModule } from './infrastructure/mongodb/mongodb.module';
import { PacienteController } from './presentation/paciente.controller';
import { PacienteService } from './application/services/paciente.service';
import { CreatePacienteUseCase } from './domain/use-cases/create-paciente.usecase';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://3.91.207.106:27017/veterinaria'),
    MongoDBModule,
  ],
  controllers: [PacienteController],
  providers: [
    {
      provide: PacienteService,
      useFactory: (repo) => new PacienteService(repo),
      inject: ['PacienteRepository']
    }
  ],
})
export class AppModule {}
