import crypto from "crypto";

const getGuid = () => {
  return crypto.randomUUID();
};

const generatePBKDF2Hash = (password) => {
  const salt = process.env.pbkdf2Salt;
  const iterations = 10000;
  const keyLength = 32;
  const digest = "sha256";

  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, salt, iterations, keyLength, digest, (err, key) => {
      if (err) {
        reject(err);
      } else {
        resolve(key.toString("hex"));
      }
    });
  });
};
const generateRandomPassword = (length) => {
  const numbers = "0123456789";
  const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialCharacters = "!@#$%&";
  const allCharacters =
    numbers + lowercaseLetters + uppercaseLetters + specialCharacters;

  let randomString = "";
  randomString += numbers.charAt(crypto.randomInt(0, numbers.length));
  randomString += lowercaseLetters.charAt(
    crypto.randomInt(0, lowercaseLetters.length)
  );
  randomString += uppercaseLetters.charAt(
    crypto.randomInt(0, uppercaseLetters.length)
  );
  randomString += specialCharacters.charAt(
    crypto.randomInt(0, specialCharacters.length)
  );

  for (let i = randomString.length; i < length; i++) {
    randomString += allCharacters.charAt(
      crypto.randomInt(0, allCharacters.length)
    );
  }

  return randomString
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};

export { getGuid, generatePBKDF2Hash, generateRandomPassword };
