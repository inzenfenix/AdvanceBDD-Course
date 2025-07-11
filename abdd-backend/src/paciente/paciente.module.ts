import { Module, OnModuleInit } from "@nestjs/common";
import { PacienteController } from "src/presentation/paciente.controller";
import { PacienteService } from "src/application/services/paciente.service";
import { PacienteRepositoryRegistry } from "./paciente-repo.registry";

import { MongoPacienteRepository } from "src/infrastructure/mongodb/paciente.repository.mongo";

