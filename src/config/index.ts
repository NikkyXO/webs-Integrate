export const configuration = (): object => ({
  mongoDBURI: process.env.MONGODB_URI,
  privateKey: process.env.PRIVATE_KEY,
  contractAddress: process.env.CONTRACT_ADDRESS,
  infuraHolesky: process.env.INFURA_HOLESKY,
});
