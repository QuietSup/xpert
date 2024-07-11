import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OcrService } from 'src/ocr/ocr.service';

@Controller()
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @MessagePattern({ cmd: 'extract-text-from-image' })
  async textFromImage(@Payload() image: Express.Multer.File) {
    console.log('ocr:', image);
    return this.ocrService.extractTextFromImage(image);
  }
}
