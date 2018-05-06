import develop from './env.develop';
import production from './env.production';

const buildConfigs = { develop, production };
const environment = 'develop';

export default buildConfigs[environment];
