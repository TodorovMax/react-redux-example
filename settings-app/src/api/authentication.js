import { executionContext } from './index';

export const getSecurityRoles = () => executionContext.userSettings.securityRoles;
