import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const sdk = new ThirdwebSDK("goerli", {
  clientId: "7e6bd9d8a8f34d78f94faaf050dc8f75",
});

async function create_wallet(){
  const contract = await sdk.getContract("0x354E92a1FC12F515CdcCD815A243FbD8BD77a9Eb");
  const tx = await contract.accountFactory.createAccount("0x547F61FC3B2AC2B21518d660dE20398776d7C755", "");
  const receipt = tx.receipt();
  const accountAddress = tx.address;
}