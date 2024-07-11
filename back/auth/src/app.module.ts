import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Jwt, JwtSchema } from 'src/schemas/jwt.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@auth-db'),
    MongooseModule.forFeature([{ name: Jwt.name, schema: JwtSchema }]),
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
