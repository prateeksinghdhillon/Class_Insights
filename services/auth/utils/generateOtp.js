export const getOtp = () => {
  const otp = Math.random();
  return Math.floor(otp * 100000);
};

