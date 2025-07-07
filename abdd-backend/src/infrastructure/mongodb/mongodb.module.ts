import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PacienteSchema } from "./schemas/paciente.schema";
import { MongoPacienteRepository } from "./paciente.repository.mongo";

@Module({
    imports:[MongooseModule.forFeature([{name:'Paciente', schema:PacienteSchema}])],
    providers:[
        {
            provide:'PacienteRepository',
            useClass: MongoPacienteRepository
        }
    ],
    exports:['PacienteRepository']
})
export class MongoDBModule {}