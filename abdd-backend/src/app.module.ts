import { Module } from '@nestjs/common';
import { PacienteModule } from './presentation/paciente/paciente.module';
import { DBConfigModule } from './db-config.module';
import { TutorModule } from './presentation/tutor/tutor.module';

@Module({
  imports: [
    DBConfigModule,
    PacienteModule,
    TutorModule
  ],
})
export class AppModule {}