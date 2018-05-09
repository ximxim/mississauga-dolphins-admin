import develop from './env.develop';
import production from './env.production';

const buildConfigs = { development: develop, production };
export default buildConfigs[process.env.NODE_ENV];
