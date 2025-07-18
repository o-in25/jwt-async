import jwt from 'jsonwebtoken';

export const verifyUserToken = <T>(token: string, signingKey: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, signingKey, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded as T);
    });
  });
};

export const signUserToken = <T extends object>(payload: T, signingKey: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, signingKey, { algorithm: 'HS256' }, (err, token) => {
      if (err || !token) return reject(err || new Error('Token creation failed.'));
      return resolve(token);
    });
  });
};
