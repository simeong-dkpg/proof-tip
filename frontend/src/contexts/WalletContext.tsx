import React, { createContext, useContext, useState, useCallback } from "react";
import { toast } from "sonner";

interface WalletState {
  connected: boolean;
  address: string;
  username: string;
  balance: number;
}

interface WalletContextType {
  wallet: WalletState | null;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType>({
  wallet: null,
  connect: () => {},
  disconnect: () => {},
});

const MOCK_WALLET: WalletState = {
  connected: true,
  address: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
  username: "alice.btc",
  balance: 142.58,
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<WalletState | null>(null);

  const connect = useCallback(() => {
    setWallet(MOCK_WALLET);
    toast.success("Wallet connected", { description: `Connected as ${MOCK_WALLET.username}` });
  }, []);

  const disconnect = useCallback(() => {
    setWallet(null);
    toast.info("Wallet disconnected");
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
