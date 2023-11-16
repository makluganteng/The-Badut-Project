import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import { useRouter } from "next/router";

export const Navbar = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between align-center p-[20px] bg-[#F4DFC8]">
      <div className="flex align-center text-center">
        <Image
          src="/wallet.svg"
          width={50}
          height={50}
          alt="wallet"
          className="rounded"
        />
        <h1
          className="text-[20px] cursor-pointer font-bold pt-[7px]"
          onClick={() => {
            router.push("/");
          }}
        >
          The Badut Project
        </h1>
      </div>
      <div>
        <ConnectWallet />
      </div>
    </div>
  );
};
