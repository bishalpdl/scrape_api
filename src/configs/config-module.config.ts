import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import { appEnvsSchema } from 'src/configs-envs/app.envs';
import { dbEnvsSchema } from 'src/configs-envs/db.envs';
import { jwtEnvsSchema } from 'src/configs-envs/jwt.envs';
import { throttlerEnvsSchema } from 'src/configs-envs/throttler.envs';
import { allConfigEnvs } from '../configs-envs';

export const configModuleConfigs: ConfigModuleOptions = {
  cache: true,
  isGlobal: true,
  load: allConfigEnvs,
  ignoreEnvFile: false,
  validationSchema: Joi.object({
    ...appEnvsSchema,
    ...dbEnvsSchema,
    ...throttlerEnvsSchema,
    ...jwtEnvsSchema,
  }),
  validationOptions: {},
};
