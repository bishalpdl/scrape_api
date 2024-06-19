import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const jwtEnvsSchema = {
  JWT_BEARER_SECRET: Joi.string().required(),
  JWT_BEARER_EXPIRE_IN_SEC: Joi.number().required(),

  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRE_IN_SEC: Joi.number().required(),
};

export const jwtEnvs = registerAs('jwt', () => {
  return {
    bearerSecret: process.env['JWT_BEARER_SECRET'],
    bearerValiditySec: Number(process.env['JWT_BEARER_EXPIRE_IN_SEC']),

    refreshTokenSecert: process.env['JWT_REFRESH_SECRET'],
    refreshTokenValiditySec: Number(process.env['JWT_REFRESH_EXPIRE_IN_SEC']),
  };
});
