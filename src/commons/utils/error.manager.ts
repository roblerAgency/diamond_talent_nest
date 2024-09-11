import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorManager extends Error {
  constructor({
    type,
    message,
  }: {
    type: keyof typeof HttpStatus;
    message: string;
  }) {
    super(`${type} :: ${message}`);
  }

  public static createSignatureError(message: string) {
    const name = message.split(' :: ')[0];
    if (name) {
      throw new HttpException(message, HttpStatus[name]);
    } else {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export const errorManagerParamCharacter = ({ id }) => {
  if (!Number.isInteger(id) || !id) {
    throw new ErrorManager({
      type: 'BAD_REQUEST',
      message: `Only numeric type IDs are allowed ${id}`,
    });
  }
} 
