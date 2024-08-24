import { userDetails } from "src/types/user_auth";

const jwt = require('jsonwebtoken');

export class authUser {
     constructor(payload: userDetails) {
          const secretKey = 'blackcat@69';
          const options = { expiresIn: '23h' };
          const token = jwt.sign(payload, secretKey, options);
          return token
     }
}