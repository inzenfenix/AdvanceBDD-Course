import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { connection } from 'mongoose';
//import * as cassandra from 'cassandra-driver';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { AwsCredentialIdentity } from '@aws-sdk/types';

export async function CreateMongoConnection(
  config: ConfigService,
): Promise<MongooseModuleOptions> {
  const uri = config.get<string>('MONGO_URI');

  if (!uri) {
    console.error('MONGO_URI not defined on .env');
    throw new Error('No environment variable MONGO_URI for mongo connection');
  }

  console.log('Connecting to Mongo...');

  connection.on('connected', () => {
    console.log('Connected succesfully to MongoDB');
  });

  connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  connection.on('disconnected', () =>
    console.warn('Disconnected from the mongo database'),
  );

  return {
    uri,
    connectionFactory: (connection) => {
      return connection;
    },
  };
}

export const createDynamoClient = (
  config: ConfigService,
): DynamoDBDocumentClient => {
  const region = config.get<string>('DYNAMO_REGION');
  const accessKeyId = config.get<string>('DYNAMO_ACCESS_KEY_ID');
  const secretAccessKey = config.get<string>('DYNAMO_SECRET_ACCESS_KEY');
  const sessionToken = config.get<string>('DYNAMO_SESSION_TOKEN');

  const credentials: AwsCredentialIdentity = {
    accessKeyId: accessKeyId!,
    secretAccessKey: secretAccessKey!,
    sessionToken: sessionToken,
  };

  const client = new DynamoDBClient({
    region,
    credentials: credentials,
  });

  return DynamoDBDocumentClient.from(client);
};
