import { Module, OnModuleInit } from "@nestjs/common";
import { PacienteController } from "src/presentation/paciente.controller";
import { PacienteService } from "src/application/services/paciente.service";
import { PacienteRepositoryRegistry } from "./paciente-repo.registry";
import { MongoPacienteRepository } from "src/infrastructure/mongodb/paciente.repository.mongo";

import { MongoDBModule } from "src/infrastructure/mongodb/mongodb.module";

@Module({
    imports:[MongoDBModule],
    
    controllers:[PacienteController],
    providers: [
        PacienteService,
        PacienteRepositoryRegistry,
    ],
    exports:[PacienteRepositoryRegistry]
})
export class PacienteModule implements OnModuleInit
{
    constructor (
        private readonly registry: PacienteRepositoryRegistry,
        private readonly mongo : MongoPacienteRepository,
    ){}

    onModuleInit() {
        this.registry.register('mongo', this.mongo)
    }
}