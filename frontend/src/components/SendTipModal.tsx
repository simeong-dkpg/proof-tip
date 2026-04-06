import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/contexts/WalletContext";
import { NETWORK_FEE } from "@/lib/mock-data";
import { Loader2, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

type TxState = "idle" | "pending" | "success" | "error";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultRecipient?: string;
  defaultAmount?: string;
  defaultMessage?: string;
}

export default function SendTipModal({ open, onOpenChange, defaultRecipient = "", defaultAmount = "", defaultMessage = "" }: Props) {
  const { wallet } = useWallet();
  const [recipient, setRecipient] = useState(defaultRecipient);
  const [amount, setAmount] = useState(defaultAmount);
  const [message, setMessage] = useState(defaultMessage);

  useEffect(() => {
    if (open) {
      setRecipient(defaultRecipient);
      setAmount(defaultAmount);
      setMessage(defaultMessage);
      setTxState("idle");
      setProofId("");
    }
  }, [open, defaultRecipient, defaultAmount, defaultMessage]);
  const [txState, setTxState] = useState<TxState>("idle");
  const [proofId, setProofId] = useState("");

  const numAmount = parseFloat(amount) || 0;
  const total = numAmount + NETWORK_FEE;
  const canSend = recipient.trim() && numAmount > 0 && wallet && wallet.balance >= total;

  function reset() {
    setRecipient(defaultRecipient);
    setAmount(defaultAmount);
    setMessage(defaultMessage);
    setTxState("idle");
    setProofId("");
  }