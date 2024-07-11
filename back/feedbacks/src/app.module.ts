import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FeedbacksModule } from 'src/feedbacks/feedbacks.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@feedbacks-db'),
    FeedbacksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
