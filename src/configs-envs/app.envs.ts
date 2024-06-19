import * as Joi from 'joi';

export const appEnvsSchema = {
  PORT: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'testing', 'staging', 'production')
    .required(),
};

export const appEnvs = () => {
  return {
    PORT: process.env['PORT'],
    nodeEnv: process.env['NODE_ENV'],
    isProd: process.env['NODE_ENV'] === 'production',
    isDev: process.env['NODE_ENV'] === 'development',
  };
};
