import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from 'src/main/main.module';

@Module({
  imports: [MainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
