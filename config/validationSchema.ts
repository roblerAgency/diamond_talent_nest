// src/config/validationSchema.ts
import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().required(),
});
