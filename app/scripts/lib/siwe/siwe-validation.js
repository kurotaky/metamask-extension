import { stripHexPrefix } from 'ethereumjs-util';
import { ParsedMessage } from '@spruceid/siwe-parser';

const msgHexToText = (hex) => {
  try {
    const stripped = stripHexPrefix(hex);
    const buff = Buffer.from(stripped, 'hex');
    return buff.length === 32 ? hex : buff.toString('utf8');
  } catch (e) {
    return hex;
  }
};

const detectSIWE = (msgParams) => {
  try {
    const { data, origin = null } = msgParams;
    const message = msgHexToText(data);
    const messageData = new ParsedMessage(message);
    let isSIWEDomainValid = false;

    if (domainToVerify) {
      const { hostname } = new URL(domainToVerify);
      isSIWEDomainValid = messageData.domain === hostname;
    }

    return {
      isSIWEMessage: true,
      isSIWEDomainValid,
      messageData,
    };
  } catch (error) {
    // ignore error, it's not a valid SIWE message
    return {
      isSIWEMessage: false,
      isSIWEDomainValid: false,
      messageData: null,
    };
  }
};
export default detectSIWE;
