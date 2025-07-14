import { Module } from '@nestjs/common';
import { Client as CassandraClient } from 'cassandra-driver';
import { DBConfigModule } from 'src/db-config.module';
import { CassandraTutorRepository } from './tutor.repository.cassandra';

@Module({
  imports: [DBConfigModule],
  providers: [
    {
      provide: CassandraTutorRepository,
      useFactory: (client: CassandraClient) =>
        new CassandraTutorRepository(client),
      inject: ['CASSANDRA_CLIENT'],
    },
  ],
  exports: [CassandraTutorRepository],
})
export class CassandraModule {}
