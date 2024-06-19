import { appEnvs } from './app.envs';
import { dbEnvs } from './db.envs';
import { jwtEnvs } from './jwt.envs';
import { throttlerEnvs } from './throttler.envs';

export const allConfigEnvs = [appEnvs, dbEnvs, throttlerEnvs, jwtEnvs];
