import { IEnvironment } from './ienvironment';

export const environment: IEnvironment = {
  production: false,
  useLocalApi: true,
  healthWiseUrl: '',
  testUser: process.env.HEALTHWISE_TESTUSER || '',
  authConfig: {
    clientRoot: process.env.HEALTHWISE_AUTHCONFIG_CLIENTROOT || '',
    apiRoot: process.env.HEALTHWISE_AUTHCONFIG_APIROOT || '',
    stsAuthority: process.env.HEALTHWISE_AUTHCONFIG_STSAUTHORITY || '',
    clientId: process.env.HEALTHWISE_AUTHCONFIG_CLIENTID || '',
    audience: process.env.HEALTHWISE_AUTHCONFIG_APIID || '',
  },
  imageCDN: process.env.HEALTHWISE_IMAGE_CDN || '',
};
