import {UsagePage} from './hid';
import {Logger} from './logger';


export const getTelephonyCollection = (device: HIDDevice, logger: Logger) => {
  const telephonyCollection = device.collections.find(
      (collection) => collection.usagePage === UsagePage.TELEPHONY
  );

  if (telephonyCollection === undefined) {
    logger.error('No telephony collection');
    throw new Error('No telephony collection');
  }

  return telephonyCollection;
};
