import { RpcException } from '@nestjs/microservices';

export class CodeException extends RpcException {
  constructor(
    message: string,
    public code: number,
  ) {
    super({ message, code });
  }
}
