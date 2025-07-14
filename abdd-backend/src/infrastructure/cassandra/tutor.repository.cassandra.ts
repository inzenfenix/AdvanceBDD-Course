import { Injectable } from '@nestjs/common';
import { ITutorRepository } from 'src/domain/repositories/tutor.repository';
import { Tutor } from 'src/domain/entities/tutor.entity';
import { Client as CassandraClient } from 'cassandra-driver';

@Injectable()
export class CassandraTutorRepository implements ITutorRepository {
  constructor(private readonly client: CassandraClient) {}
  async CreateTutor(tutor: Tutor): Promise<void> {
    const query = 'INSERT INTO tutor (id, nombre, idmascotas) VALUES (?, ?, ?)';
    const params = [tutor.getId(), tutor.getNombre(), tutor.getMascotas()];
    await this.client.execute(query, params, {prepare:true});
  }
  async FindById(id: string): Promise<Tutor | null> {
    throw new Error('Method not implemented.');
  }
  async UpdateTutor(tutor: Tutor): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async DeleteTutor(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async DeleteAll(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async FindAll(): Promise<Tutor[] | undefined> {
    const query = 'SELECT * FROM tutor';
    const result = await this.client.execute(query);

    return result.rows.map((row) => new Tutor(row.id, row.nombre, row.idmascotas));
  }
}
