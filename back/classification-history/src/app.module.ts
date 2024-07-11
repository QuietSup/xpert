import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Record, RecordSchema } from 'src/records/record.schema';
import { RecordsModule } from 'src/records/records.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@clhistory-db'),
    MongooseModule.forFeature([{ name: Record.name, schema: RecordSchema }]),
    RecordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
