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
import { useEffect, useState } from "react";

import {
  ConnectWallet,
  ThirdwebSDK,
  useAccountsForAddress,
  useAddress,
  useContract,
  useCreateAccount,
  useSigner,
} from "@thirdweb-dev/react";
import { useChainId, useContractEvent } from "wagmi";
import FactoryABI from "../../public/FactorABI.json";
import { envConfigMappings } from "@/utils/chain";

export default function CreateAccount() {
  const [state, setState] = useState<Boolean>(true);
  const [owned, setOWned] = useState<String[]>([]);
  const [chain, setChain] = useState<String>("");
  const [contractAddress, setContractAddress] = useState<String>("");

  const toast = useToast();
  const chainId = useChainId();
  const address = useAddress();

  const { contract } = useContract(envConfigMappings[chainId].factory_address);
  const {
    mutate: createAccount,
    isLoading,
    error,
    data,
  } = useCreateAccount(contract);

  if (error) {
    console.error("failed to create account", error);
  }

  const { data: accountsForAddress, error: error2 } = useAccountsForAddress(
    contract,
    address
  );

  useEffect(() => {
    setContractAddress(envConfigMappings[chainId].factory_address);
    if (accountsForAddress) {
      setOWned(accountsForAddress);
    }
  }, []);

  const unwatch = useContractEvent({
    address: contractAddress as `0x${string}`,
    abi: FactoryABI,
    eventName: "AccountCreated",
    listener: async (event) => {
      console.log(event);
      // const account = event[0].args.governance;
      // setGovernanceAddress(governance);
      // const result = await axios.post(
      //   "http://localhost:3001/governance/add-governance",
      //   {
      //     governanceAddress: governance,
      //     chainId: chainId,
      //     deployer: walletAddress,
      //   }
      // );

      // console.log(result.data);
      // setGasTank(result.data.data[0].account_tank_address);
      unwatch?.();
    },
  });

  const handleClick = async () => {
    try {
      createAccount(address as string);
      toast({
        title: "Account created.",
        description: "Account deployed for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      // }
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
        {owned ? (
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
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
