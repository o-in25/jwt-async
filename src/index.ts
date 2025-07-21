// src/index.ts
import jwt from 'jsonwebtoken';

export const verifyAsync = <T>(token: string, signingKey: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    if (!signingKey) return reject(new Error('No JWT signing key provided.'));
    jwt.verify(token, signingKey, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded as T);
    });
  });
};

export const signAsync = <T extends object>(payload: T, signingKey: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!signingKey) return reject(new Error('No JWT signing key provided.'));
    jwt.sign(payload, signingKey, { algorithm: 'HS256' }, (err, token) => {
      if (err || !token) return reject(err || new Error('Token creation failed.'));
      return resolve(token);
    });
  });

