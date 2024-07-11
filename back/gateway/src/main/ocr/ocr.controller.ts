import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OcrProxyService } from 'src/main/ocr/ocr-proxy/ocr-proxy.service';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrProxyService: OcrProxyService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async extractTextFromImage(@UploadedFile() image: Express.Multer.File) {
    console.log(image);
    const result = await this.ocrProxyService.extractTextFromImage(image);
    return { text: result };
  }
}
