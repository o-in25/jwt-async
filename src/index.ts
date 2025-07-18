// src/index.ts
import jwt from 'jsonwebtoken';

const { JWT_SIGNING_KEY } = process.env;

export const verifyAsync = <T>(token: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (!JWT_SIGNING_KEY) return reject(new Error('No JWT signing key found.'));
    jwt.verify(token, JWT_SIGNING_KEY, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded as T);
    });
  });
};

export const signAsync = <T extends object>(payload: T): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!JWT_SIGNING_KEY) return reject(new Error('No JWT signing key found.'));
    jwt.sign(payload, JWT_SIGNING_KEY, { algorithm: 'HS256' }, (err, token) => {
      if (err || !token) return reject(err || new Error('Token creation failed.'));
      return resolve(token);
    });
  });
};
