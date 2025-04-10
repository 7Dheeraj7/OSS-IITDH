const Id_card_NFT = artifacts.require("Id_card_NFT");
const Certificate_NFT = artifacts.require("Certificate_NFT");
const Fee_payment_NFT = artifacts.require("Fee_payment_NFT");
module.exports = async function (deployer) {
  await deployer.deploy(Id_card_NFT);
  await deployer.deploy(Certificate_NFT);
  await deployer.deploy(Fee_payment_NFT);
};