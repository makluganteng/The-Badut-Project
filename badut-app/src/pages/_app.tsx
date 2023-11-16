import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { polygon, optimism, arbitrum, base, zora, sepolia } from "viem/chains";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Navbar } from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  const { chains, publicClient } = configureChains(
    [sepolia],
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
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
