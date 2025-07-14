import { Injectable } from '@nestjs/common';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
  ScanCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import { IFichaMedicaRepository } from 'src/domain/repositories/ficha-medica.repository';
import { FichaMedica } from 'src/domain/entities/ficha-medica.entity';

@Injectable()
export class DynamoFichaMedicaRepository implements IFichaMedicaRepository {
  constructor(private readonly client: DynamoDBDocumentClient) {}
  private readonly tableName = 'FichaMedica';

  async CreateFicha(ficha: FichaMedica): Promise<void> {
    const doc = {
      idFichaMedica: ficha.getId(),
      idMascota: ficha.getIdMascota(),
      revisionesMedicas: ficha.getRevisionesMedicas(),
      carnetVacuna: ficha.getVacunas()
    };

    await this.client.send(
      new PutCommand({
        TableName: this.tableName,
        Item: doc,
      }),
    );
  }

  async FindById(id: string): Promise<FichaMedica | null> {
    const res = await this.client.send(
      new GetCommand({
        TableName: this.tableName,
        Key: { idFichaMedica: id },
      }),
    );

    const doc = res.Item;

    return doc
      ? new FichaMedica(
          doc.idFichaMedica,
          doc.idMascota,
          doc.revisionesMedicas,
          doc.carnetVacuna,
        )
      : null;
  }
  async UpdateFicha(ficha: FichaMedica): Promise<void> {
    await this.client.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { idFichaMedica: ficha.getId() },
        UpdateExpression:
          'SET idMascota = :idMascota, revisionesMedicas = :revisionesMedicas, carnetVacuna = :carnetVacuna',
        ExpressionAttributeValues: {
          ':idMascota': ficha.getId(),
          ':revisionesMedicas': ficha.getRevisionesMedicas(),
          ':carnetVacuna': ficha.getVacunas(),
        },
      }),
    );
  }

  async DeleteFicha(id: string): Promise<string> {
    const res = await this.client.send(
      new GetCommand({ TableName: this.tableName, Key: { idFichaMedica: id } }),
    );

    const doc = res.Item;

    if (!doc) return 'Ficha Medica not found';

    await this.client.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { idFichaMedica: id },
      }),
    );

    return "Ficha Medica removed";
  }

  async DeleteAll(): Promise<string> {
    const res = await this.client.send(
      new ScanCommand({ TableName: this.tableName }),
    );

    const items = res.Items || [];

    if (items.length === 0) return 'No Fichas Medicas found on the database';

    for (const item of items) {
      await this.client.send(
        new DeleteCommand({
          TableName: this.tableName,
          Key: { idFichaMedica: item.idFichaMedica },
        }),
      );
    }
    return `Removed ${items.length} fichas medicas`;
  }

  async FindAll(): Promise<FichaMedica[] | undefined> {
    const result = await this.client.send(
      new ScanCommand({
        TableName: this.tableName,
      }),
    );

    return (result.Items || []).map(
      (item) =>
        new FichaMedica(
          item.idFichaMedica,
          item.idMascota,
          item.revisionesMedicas,
          item.carnetVacuna
        ),
    );
  }

  FindByPetId(idMascota: string): Promise<FichaMedica | null> {
    throw new Error('Method not implemented.');
  }
}
