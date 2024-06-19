import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const throttlerEnvsSchema = {
  MAX_REQUESTS_PER_SECOND: Joi.number().integer().min(1).required(),
  MAX_REQUESTS_PER_MINUTE: Joi.number().integer().min(1).required(),
};

export const throttlerEnvs = registerAs('throttler', () => ({
  maxRequestInSec: process.env['MAX_REQUESTS_PER_SECOND'],
  maxRequestInMin: process.env['MAX_REQUESTS_PER_MINUTE'],
}));
