import { InjectionToken, inject } from '@angular/core';
import { IAuthConfig } from '../../../environments/ienvironment';
import { EnvironmentService } from '../services/environment.service';

export const AUTH_CONFIG = new InjectionToken<IAuthConfig>(
  'Auth configuration',
  {
    factory: () => {
      const environmentService = inject(EnvironmentService);
      const authConfig = environmentService.get('authConfig') as IAuthConfig;
      return {
        clientRoot: authConfig.clientRoot,
        apiRoot: authConfig.apiRoot,
        stsAuthority: authConfig.stsAuthority,
        clientId: authConfig.clientId,
        audience: authConfig.audience,
      };
    },
  }
);
