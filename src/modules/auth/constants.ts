import 'dotenv/config';

export const jwtConstants = {
  secret: process.env.JWT_TOKEN,
  expiresIn: process.env.JWT_EXPIRES_IN,
};
