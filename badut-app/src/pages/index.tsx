import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-screen bg-[#FFEBD8]">
      <div className="text-center w-full">
        <div className="flex justify-center align-center">
          <Image
            src="/wallet.svg"
            width={200}
            height={200}
            alt="wallet"
            className="rounded"
          />
        </div>
        <h1 className="text-[30px] mb-4">Welcome to the Badut Project</h1>
        <div className="typewriter">
          <p>
            A place where people can control multiple wallets on different
            chains from 1 source chain
          </p>
        </div>
        <br />
        <div>
          <Button
            onClick={() => {
              router.push("/create-account");
            }}
          >
            Create Account
          </Button>
        </div>
        <br />
        <div>
          <Button>Existing Account</Button>
        </div>
      </div>
    </div>
  );
}
