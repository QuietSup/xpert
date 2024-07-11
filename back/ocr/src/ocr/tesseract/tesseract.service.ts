import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';

@Injectable()
export class TesseractService {
  async extractTextFromImage(image: any) {
    console.log(image.buffer);
    const worker = createWorker('eng', 1);
    const {
      data: { text },
    } = await (await worker).recognize(image.buffer.data);
    (await worker).terminate();
    return text;
  }
}
