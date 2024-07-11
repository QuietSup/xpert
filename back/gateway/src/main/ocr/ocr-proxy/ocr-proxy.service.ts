import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OcrProxyService {
  constructor(
    @Inject('OCR_SERVICE')
    private readonly ocrClientProxyService: ClientProxy,
  ) {}

  async extractTextFromImage(image: Express.Multer.File) {
    const response = this.ocrClientProxyService.send(
      { cmd: 'extract-text-from-image' },
      image,
    );
    return await lastValueFrom(response);
  }
}
