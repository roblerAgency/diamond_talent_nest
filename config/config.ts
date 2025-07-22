// src/config/config.ts
import { ConfigService } from '@nestjs/config';

export const config = (configService: ConfigService) => ({
  database: {
    url: configService.get<string>('DATABASE_URL'),
  },
  jwtSecret: configService.get<string>('JWT_SECRET'),
});
