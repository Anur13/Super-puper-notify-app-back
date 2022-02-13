const crypto = require("crypto");
const AuthErrors = require("../errors/authErrors");
const Path = require("path");
require("dotenv").config({ path: Path.resolve(__dirname + "/../.env") });

class Auth {
  constructor() {
    this.secretKey = process.env.SECRET_KEY;
    this.algorithm = process.env.ALGORITHM;
    this.iv = crypto.randomBytes(16);
  }

  createToken(value, timeToExpire = 1440) {
    const stringifyValue = `${value}/`;
    const minuteInMs = 60000;
    const createDate = new Date();

    const salt1 = crypto.randomBytes(16);
    const salt2 = crypto.randomBytes(16);
    const additionalSalt = `${salt1.toString("hex")}%${salt2.toString("hex")}`;

    const expiredAfter = createDate.getTime() + timeToExpire * minuteInMs;

    const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
    const encrypted = Buffer.concat([
      cipher.update(stringifyValue),
      cipher.update(expiredAfter.toString()),
      cipher.final(),
    ]);

    return `${this.iv.toString("hex")}%${encrypted.toString("hex")}%${additionalSalt}`;
  }

  validateToken(hash) {
    const iv = hash.split("%")[0];
    const valueAndExpireDate = hash.split("%")[1];

    let decipher;
    try {
      decipher = crypto.createCipheriv(
        this.algorithm,
        this.secretKey,
        Buffer.from(iv, "hex"),
      );
    } catch (e) {
      throw AuthErrors.invalidToken;
    }

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(valueAndExpireDate, "hex")),
      decipher.final(),
    ]).toString();

    const splitDecryptedValue = decrypted.split("/");
    const isId = splitDecryptedValue[0].match(/^[a-f\d]{24}$/i);

    if (!splitDecryptedValue[1] || !isId) {
      throw AuthErrors.invalidToken;
    }

    const currentDate = new Date().getTime();
    const dateFromHash = parseInt(splitDecryptedValue[1]);

    const isTokenValid = currentDate < dateFromHash;

    if (!isTokenValid) {
      throw AuthErrors.expiredToken;
    }

    return true;
  }
}

module.exports = new Auth();
