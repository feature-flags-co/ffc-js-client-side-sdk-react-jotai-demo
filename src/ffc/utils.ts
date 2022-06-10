import ffcClient from 'ffc-js-client-side-sdk';
import { flagsDefaultValues } from './config';

export const createFlagsProxy = () => {
  return new Proxy({}, {
    get(target: Object, prop: string, receiver: Object) {
      const variation = ffcClient.variation(prop, flagsDefaultValues[prop] || '');

      return variation;
    }
  })
}