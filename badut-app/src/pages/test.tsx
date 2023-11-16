import { fetchWallet } from "@/utils/supabase";
import { Button, Select } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { use, useEffect, useState } from "react";
import {
  EVMAssetTransfer,
  Environment,
  getTransferStatusData,
} from "@buildwithsygma/sygma-sdk-core";
import { ethers } from "ethers";

export default function Test() {
  const [wallets, setWallets] = useState<any[]>([]);

  const address = useAddress();

  useEffect(() => {
    const wallet = async () => {
      const result = await fetchWallet(address as string);
      setWallets(result?.owned_wallets);
    };
    wallet();
  }, []);

  return (
    <div>
      <h1>Cross Chain Emulate</h1>
      <div>
        <div>
          <h1>Source Chain</h1>
        </div>
        <Select>
          {wallets.map((wallet, key) => {
            return <option key={key}>{wallet}</option>;
          })}
        </Select>
      </div>
      <div>
        <div>
          <h1>Destination Chain</h1>
        </div>
        <Select>
          {wallets.map((wallet, key) => {
            return <option key={key}>{wallet}</option>;
          })}
        </Select>
      </div>
      <div>
        <Button
          onClick={async () => {
            // transfer
            const assetTransfer = new EVMAssetTransfer();

            const provider = new ethers.providers.JsonRpcProvider(
              "https://eth-goerli.g.alchemy.com/v2/z6F5YIkN7g8W25b2_IJKT1iKKiEWsfvf"
            );

            const destinationProvider = new ethers.providers.JsonRpcProvider(
              "https://eth-sepolia.g.alchemy.com/v2/z6F5YIkN7g8W25b2_IJKT1iKKiEWsfvf"
            );

            await assetTransfer.init(provider, Environment.TESTNET);
          }}
        >
          Transfer
        </Button>
      </div>
    </div>
  );
}
