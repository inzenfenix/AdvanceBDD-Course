import { Module, OnModuleInit } from "@nestjs/common";
import { MongoDBModule } from "src/infrastructure/mongodb/mongodb.module";
import { FichaMedicaController } from "../ficha-medica.controller";
import { FichaMedicaService } from "src/application/services/ficha-medica.service";
import { FichaMedicaRepositoryRegistry } from "./ficha-medica.registry";
import { MongoFichaMedicaRepository } from "src/infrastructure/mongodb/ficha-medica.repository.mongo";

@Module({
    imports:[MongoDBModule],
    
    controllers:[FichaMedicaController],
    providers: [
        FichaMedicaService,
        FichaMedicaRepositoryRegistry,
    ],
    exports:[FichaMedicaRepositoryRegistry]
})
export class FichaMedicaModule implements OnModuleInit
{
    constructor (
        private readonly registry: FichaMedicaRepositoryRegistry,
        private readonly mongo : MongoFichaMedicaRepository,
    ){}

    onModuleInit() {
        this.registry.register('mongo', this.mongo);
    }
}