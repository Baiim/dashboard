import crypto from 'crypto';
import { AES_SECRET_KEY, AES_IV } from '../configs/keys';

export const encryptAes = data => {
  if (data) {
    const cipher = crypto.createCipheriv('aes-256-cbc', AES_SECRET_KEY, AES_IV);
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  }
  return null;
};

export const decryptAes = data => {
  const cipher = crypto.createDecipheriv('aes-256-cbc', AES_SECRET_KEY, AES_IV);
  const decrypted = cipher.update(data, 'utf8', 'base64');
  return decrypted;
};
