export interface IEnvironment {
  production: boolean;
  healthWiseUrl: string;
  useLocalApi: boolean;
  testUser: string;
  authConfig: IAuthConfig;
}

export interface IAuthConfig {
  clientRoot: string;
  apiRoot: string;
  stsAuthority: string;
  clientId: string;
  audience: string;
}
