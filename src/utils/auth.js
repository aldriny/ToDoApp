import jwt from 'jsonwebtoken';

const maxAgeInSeconds = 2 * 7 * 24 * 60 * 60;   // 2 weeks

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAgeInSeconds
  });
};

export {createToken, maxAgeInSeconds};