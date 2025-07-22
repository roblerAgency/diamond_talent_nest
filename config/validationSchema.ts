// config/env.validation.ts
import * as Joi from 'joi';

export const configSchema = Joi.object({
  NODE_ENV:     Joi.string().required(),
  DATABASE_URL: Joi.string().required(), // 👈 just string, not uri()
  JWT_SECRET:   Joi.string().required(),
});
