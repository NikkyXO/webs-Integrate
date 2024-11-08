export const configuration = (): object => ({
  mongoDBURI: process.env.MONGODB_URI,
  privateKey: process.env.PRIVATE_KEY,
});
