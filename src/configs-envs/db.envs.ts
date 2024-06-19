import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const dbEnvsSchema = {
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SYNCHRONIZE: Joi.boolean().required(),
  DB_SSL:
    process.env['NODE_ENV'] == 'development'
      ? () => Joi.allow('').optional()
      : () => Joi.string().required(),
};

export const dbEnvs = registerAs('dbEnv', () => {
  return {
    dbHost: process.env['DB_HOST'],
    dbPort: process.env['DB_PORT'],
    dbUsername: process.env['DB_USERNAME'],
    dbPassword: process.env['DB_PASSWORD'],
    dbName: process.env['DB_NAME'],
    dbSync: process.env['DB_SYNCHRONIZE'],
    dbSsl: process.env['DB_SSL'],
  };
});
