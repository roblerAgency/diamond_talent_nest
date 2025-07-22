// src/config/validationSchema.ts
import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().required(),
  DATABASE_URL: Joi.string().required(), // Solo requiere que sea una cadena
  JWT_SECRET: Joi.string().required(),
});
