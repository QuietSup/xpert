import { Injectable } from '@nestjs/common';
import { TesseractService } from 'src/ocr/tesseract/tesseract.service';

@Injectable()
export class OcrService {
  constructor(private readonly tesseractService: TesseractService) {}

  async extractTextFromImage(image: any) {
    return this.tesseractService.extractTextFromImage(image);
  }
}
