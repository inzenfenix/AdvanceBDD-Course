import { Module, OnModuleInit } from "@nestjs/common";
import { TutorService } from "src/application/services/tutor.service";
import { TutorMongoRepository } from "src/infrastructure/mongodb/tutor.repository.mongo";
import { TutorRepositoryRegistry } from "./tutor-repo.registry";

import { MongoDBModule } from "src/infrastructure/mongodb/mongodb.module";
import { TutorController } from "../tutor.controller";

@Module({
    imports:[MongoDBModule],
    
    controllers:[TutorController],
    providers: [
        TutorService,
        TutorRepositoryRegistry,
    ],
    exports:[TutorRepositoryRegistry]
})
export class TutorModule implements OnModuleInit
{
    constructor (
        private readonly registry: TutorRepositoryRegistry,
        private readonly mongo : TutorMongoRepository,
    ){}

    onModuleInit() {
        this.registry.register('mongo', this.mongo)
    }
}