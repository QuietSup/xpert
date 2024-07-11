import { Module } from '@nestjs/common';
import { TesseractService } from 'src/ocr/tesseract/tesseract.service';

@Module({
  providers: [TesseractService],
  controllers: [],
  exports: [TesseractService],
})
export class TesseractModule {}
