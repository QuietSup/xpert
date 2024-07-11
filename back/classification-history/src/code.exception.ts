import { RpcException } from '@nestjs/microservices';

export class CodeException extends RpcException {
  constructor(code: number, message: string) {
    super({ code, message });
  }
}
