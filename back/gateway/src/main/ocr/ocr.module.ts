import { Module } from '@nestjs/common';
import { OcrProxyModule } from 'src/main/ocr/ocr-proxy/ocr-proxy.module';
import { OcrController } from 'src/main/ocr/ocr.controller';

@Module({
  imports: [OcrProxyModule],
  controllers: [OcrController],
  providers: [],
  exports: [],
})
export class OcrModule {}
