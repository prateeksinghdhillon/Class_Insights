export const getOtp = () => {
  const otp = Math.random();
  return Math.floor(otp * 100000);
};

// import crypto from "crypto";

// const getGuid = () => {
//   return crypto.randomUUID();
// };

// const generatePBKDF2Hash = (password) => {
//   const salt =" process.env.pbkdf2Salt";
//   const iterations = 10000;
//   const keyLength = 32;
//   const digest = "sha256";

//   return new Promise((resolve, reject) => {
//     crypto.pbkdf2(password, salt, iterations, keyLength, digest, (err, key) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(key.toString("hex"));
//       }
//     });
//   });
// };

// export { getGuid, generatePBKDF2Hash };
