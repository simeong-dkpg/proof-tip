import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/contexts/WalletContext";
import { mockTips } from "@/lib/mock-data";
import ProofFeed from "@/components/ProofFeed";
import SendTipModal from "@/components/SendTipModal";
import TipOfTheDay from "@/components/TipOfTheDay";
import { useCountUp } from "@/hooks/useCountUp";
import { ArrowRight, Zap, TrendingUp, Users, Hash } from "lucide-react";

export default function Index() {
  const { wallet, connect } = useWallet();
  const [modalOpen, setModalOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");