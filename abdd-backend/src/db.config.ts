import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { connection } from "mongoose";
//import * as cassandra from 'cassandra-driver';
//import { DynamoDB } from 'aws-sdk';

export async function CreateMongoConnection(config:ConfigService):Promise<MongooseModuleOptions>
{
    const uri = config.get<string>('MONGO_URI');

    if(!uri)
    {
        console.error("MONGO_URI not defined on .env");
        throw new Error('No environment variable MONGO_URI for mongo connection')
    }

    console.log("Connecting to Mongo...")

    connection.on("connected", () => { console.log("Connected succesfully to MongoDB")} );

    connection.on("error", (err) => { console.error("MongoDB connection error:", err)} );

    connection.on("disconnected", () => console.warn("Disconnected from the mongo database"));

    return {
        uri,
        connectionFactory: (connection) =>
        {
            return connection;
        }
    }
        
};