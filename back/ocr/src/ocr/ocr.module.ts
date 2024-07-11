import { Module } from '@nestjs/common';
import { OcrController } from 'src/ocr/ocr.controller';
import { OcrService } from 'src/ocr/ocr.service';
import { TesseractModule } from 'src/ocr/tesseract/tesseract.module';

@Module({
  imports: [TesseractModule],
  controllers: [OcrController],
  providers: [OcrService],
})
export class OcrModule {}
