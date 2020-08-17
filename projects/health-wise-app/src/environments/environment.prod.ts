import { IEnvironment } from './ienvironment';
export const environment: IEnvironment = {
  production: true,
  useLocalApi: false,
  healthWiseUrl: 'https://api-healthwise.lhargil.com',
  testUser: 'dc1252e5-5c0d-469a-c102-08d83c6bfc0c',
  authConfig: {
    clientRoot: process.env.HEALTHWISE_AUTHCONFIG_CLIENTROOT || '',
    apiRoot: process.env.HEALTHWISE_AUTHCONFIG_APIROOT || '',
    stsAuthority: process.env.HEALTHWISE_AUTHCONFIG_STSAUTHORITY || '',
    clientId: process.env.HEALTHWISE_AUTHCONFIG_CLIENTID || '',
  },
};
