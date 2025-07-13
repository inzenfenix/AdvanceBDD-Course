import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CreateMongoConnection } from './db.config';
import { MongooseModule } from "@nestjs/mongoose";

@Module(
    {
        imports:[
            ConfigModule.forRoot({ isGlobal:true }),

            MongooseModule.forRootAsync({
                imports:[ConfigModule],
                useFactory: CreateMongoConnection,
                inject: [ConfigService] 
            })
        ],
        exports: [
            MongooseModule,
            ConfigModule
        ]
    }
)
export class DBConfigModule{}