import { SetMetadata } from '@nestjs/common';

export const Authorization = (secured: boolean) =>
  SetMetadata('FlowareAuth', secured);
