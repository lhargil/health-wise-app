import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  production: false,
  useLocalApi: true,
  healthWiseUrl: '',
  testUser: '5d400efd-d4c7-4198-3192-08d833c7b2be',
  authConfig: {
    clientRoot: process.env.HEALTHWISE_AUTHCONFIG_CLIENTROOT || '',
    apiRoot: process.env.HEALTHWISE_AUTHCONFIG_APIROOT || '',
    stsAuthority: process.env.HEALTHWISE_AUTHCONFIG_STSAUTHORITY || '',
    clientId: process.env.HEALTHWISE_AUTHCONFIG_CLIENTID || '',
  },
};
