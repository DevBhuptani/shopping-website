import { cookieExpiresInDays, cookieKeys } from '../constants/constants';
import { AES, enc } from 'crypto-js';

/**
 * This function takes a key as input and remove that key's cookie from storage.
 * @param {string} key name of the cookie
 *
 * @isTestWrittenForThisFunction `false`
 */
export const removedCookie = (key: string) => {
  if (key) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const keyName = cookieKeys.cookieInitial + '-' + key.trim();
    document.cookie = `${keyName}=;expires=${new Date(
      0
    ).toUTCString()};domain=${window.location.hostname.replace(
      'ecommerce',
      ''
    )};path=/;`;
    // document.cookie = `${keyName}=;expires=${new Date(0).toUTCString()};domain=localhost;path=/;`;
  }
};

/**
 * This function will take cookie name as input and returns its decrypted value
 *
 * @param {string} key the name of the cookie
 * @returns {string} decrypted cookie string
 *
 * @isTestWrittenForThisFunction `true`
 */
export const getDecryptedCookie = (key: string) => {
  if (key) {
    const keyName = cookieKeys.cookieInitial + '-' + key.trim();
    const cookieData = getCookie(keyName);
    if (cookieData) {
      return decryptData(cookieData);
    }
  }
};

/**
 * It will take a key as Input and returns the cookie value of that key
 * @param {string} cookieName
 * @returns {string} cookie
 *
 * @isTestWrittenForThisFunction `false`
 */
export const getCookie = (cookieName: string) => {
  if (typeof window === 'undefined') return '';
  const name = cookieName + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  if (decodedCookie) {
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      while (c.charAt(0) === '') {
        c = c.substring(1);
      }
      if (+c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
  return '';
};

/**
 * This function wil decrypt an encrypted string {the encrypted string suppose to be an object}
 *
 * @param {string} data
 * @returns {json | string}
 *
 * @isTestWrittenForThisFunction `true`
 */
export const decryptData = (data: string) => {
  const bytes = AES.decrypt(data.toString(), cookieKeys.cryptoSecretKey);
  if (bytes.toString()) {
    return JSON.parse(bytes.toString(enc.Utf8));
  }
  return '';
};

/**
 * This function accepts any input type and returns an encrypted string.
 *
 * @param {any} data
 * @returns {string}
 *
 * @isTestWrittenForThisFunction `true`
 */
export const encryptData = <T extends string | object | boolean | Array<string> | Array<{ [key: string]: string | object }>>(data: T) => {
	return AES.encrypt(JSON.stringify(data), cookieKeys.cryptoSecretKey);
};


/**
 * It will set and encrypted cookie to localhost and lateron we can use this cookie by decrypting it.
 * @param  {string} key
 * @param {any} data
 *
 * @isTestWrittenForThisFunction `true`
 */
export const setEncryptedCookie = <T extends string | object | boolean | Array<string> | Array<{ [key: string]: string | object }>>(key: string, data: T) => {
	if (data && key) {
		const encryptedString = encryptData(data);
		const keyName = cookieKeys.cookieInitial + "-" + key.trim();
		const date = new Date();
		const expiryTime = new Date(date.setTime(date.getTime() + cookieExpiresInDays * 24 * 60 * 60 * 1000)).toUTCString();
		document.cookie = `${keyName}=${encryptedString};expires=${expiryTime};domain=${window.location.hostname.replace("ecommerce", "")};secure;path=/;`;
	}
};

export const handleFormikTrim = (
  name: string,
  value: string,
  setValue: any
) => {
  if (value.trim()) {
    setValue(name, value);
  } else {
    setValue(name, value.trim());
  }
};
