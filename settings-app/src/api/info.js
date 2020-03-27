import { oneflowRequest } from './index';

export const getSystemCompatible = () => oneflowRequest('of_VerifyCompatibility');
