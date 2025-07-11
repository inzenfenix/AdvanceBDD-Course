import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDBModule } from './infrastructure/mongodb/mongodb.module';
import { PacienteController } from './presentation/paciente.controller';
import { PacienteService } from './application/services/paciente.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://ec2-13-218-192-46.compute-1.amazonaws.com:27017/veterinaria'),
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