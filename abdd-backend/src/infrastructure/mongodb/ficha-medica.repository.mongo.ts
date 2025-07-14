import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFichaMedicaRepository } from 'src/domain/repositories/ficha-medica.repository';
import { FichaMedicaMongo } from './schemas/ficha-medica.schema';
import { FichaMedica } from 'src/domain/entities/ficha-medica.entity';

export class MongoFichaMedicaRepository implements IFichaMedicaRepository {
  constructor(
    @InjectModel('FichaMedica')
    private fichaMedicaModel: Model<FichaMedicaMongo>,
  ) {}

  async CreateFicha(fichaMedica: FichaMedica): Promise<void> {
    await new this.fichaMedicaModel({
      _id: fichaMedica.getId(),
      idMascota: fichaMedica.getIdMascota(),
      revisionesMedicas: fichaMedica.getRevisionesMedicas(),
      carnetVacuna: fichaMedica.getVacunas(),
    }).save();
  }

  async FindById(id: string): Promise<FichaMedica | null> {
    const doc = await this.fichaMedicaModel.findById(id).exec();

    if(doc === null) return null;

    return new FichaMedica(doc.id, doc.idMascota, doc.revisionesMedicas, doc.carnetVacuna);
  }

  async UpdateFicha(fichaMedica: FichaMedica): Promise<void> {
    await this.fichaMedicaModel.findByIdAndUpdate(fichaMedica.getId(), {
      idMascota: fichaMedica.getIdMascota(),
      revisionesMedicas: fichaMedica.getRevisionesMedicas(),
      carnetVacuna: fichaMedica.getVacunas(),
    });
  }

  async DeleteFicha(id: string): Promise<string> {
    const query = await this.fichaMedicaModel.deleteOne({ _id: id });

    if (query.deletedCount == 1) return 'Ficha Medica removed';
    else return "Couldn't find Ficha Medica to remove";
  }

  async DeleteAll(): Promise<string> {
    const query = await this.fichaMedicaModel.deleteMany();
    if (query.deletedCount > 0)
      return `Removed ${query.deletedCount} fichas medicas`;
    else return `No fichas medicas found on the databse`;
  }

  async FindAll(): Promise<FichaMedica[] | undefined> {
    const query = await this.fichaMedicaModel.find();
    if (query.length === 0) return undefined;
    else {
      const fichas: FichaMedica[] = [];

      for (let i = 0; i < query.length; i++) {
        const doc = query[i];
        if (!doc) continue;
        fichas.push(
          new FichaMedica(doc.id, doc.idMascota, doc.revisionesMedicas, doc.carnetVacuna),
        );
      }

      return fichas;
    }
  }

  async FindByPetId(idMascota: string): Promise<FichaMedica | null> {
    throw new Error('Method not implemented.');
  }
}
