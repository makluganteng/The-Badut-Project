import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Card,
  CardBody,
  Input,
  ListItem,
  OrderedList,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

import { ConnectWallet, useAddress, useContract, useCreateAccount } from "@thirdweb-dev/react";

export default function CreateAccount() {
  const [state, setState] = useState<Boolean>(true);
  const [owned, setOWned] = useState<String[]>([]);
  const [chain, setChain] = useState<String>("");

  const toast = useToast();
  
  const { contract } = useContract("0x354E92a1FC12F515CdcCD815A243FbD8BD77a9Eb");
  const {
    mutate: createAccount,
    isLoading,
    error,
  } = useCreateAccount(contract);

  if (error) {
    console.error("failed to create account", error);
  }
  const address = useAddress();

  const handleClick = async() => {
    try {
      createAccount(String(address));
      toast({
        title: "Account created.",
        description: "Account deployed for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <div className="px-[500px]">
      <ConnectWallet />
      {state ? (
        <div>
          <h1>
            Create your first ever wallet on destination chain, which chain ?
          </h1>
        </div>
      ) : (
        <div>
          <h1>Create wallet on which chain ?</h1>
        </div>
      )}
      <div className="py-[10px]">
        <Select placeholder="Destination Chain">
          <option value="sepolia">Sepolia</option>
          <option value="goerli">Goerli</option>
          <option value="Rinkeby">Rinkeby</option>
        </Select>
      </div>
      <div className="py-[10px]">
        <Input placeholder="Wallet Name" />
      </div>
      <div>
        <Button onClick={handleClick}>Deploy</Button>
      </div>
      <div className="py-[10px]">
        {state ? (
          <div></div>
        ) : (
          <div className="font-bold">
            <Card>
              <CardBody>
                <Text>Owned Wallets on Chain {chain}</Text>
                <OrderedList>
                  {owned.map((item, id) => {
                    return <ListItem key={id}>{item}</ListItem>;
                  })}
                </OrderedList>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
