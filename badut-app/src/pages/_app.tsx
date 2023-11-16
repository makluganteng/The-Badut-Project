import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { polygon, optimism, arbitrum, base, zora, sepolia, goerli } from "viem/chains";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Navbar } from "@/components/Navbar";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from "@thirdweb-dev/react";

export default function App({ Component, pageProps }: AppProps) {
  const { chains, publicClient } = configureChains(
    [sepolia,goerli],
    [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <ThirdwebProvider
                activeChain="goerli" 
                clientId="7e6bd9d8a8f34d78f94faaf050dc8f75"
          >
          <Navbar />
          <Component {...pageProps} />
          </ThirdwebProvider>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
