import { fetchWallet } from "@/utils/supabase";
import { Button, Select } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import { use, useEffect, useState } from "react";

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
        <Button>Transfer</Button>
      </div>
    </div>
  );
}
