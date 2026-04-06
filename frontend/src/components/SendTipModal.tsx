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

  function handleClose(open: boolean) {
    if (!open) reset();
    onOpenChange(open);
  }

  async function handleSend() {
    setTxState("pending");
    await new Promise((r) => setTimeout(r, 2000));

    // 90% success rate for demo
    if (Math.random() > 0.1) {
      const id = `proof-${Date.now().toString(36)}`;
      setProofId(id);
      setTxState("success");
      toast.success("Tip sent successfully!", { description: `${numAmount} STX → ${recipient}` });
    } else {
      setTxState("error");
      toast.error("Transaction failed", { description: "Network error. Please try again." });
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Send a Tip</DialogTitle>
          <DialogDescription>Support a creator with STX on-chain.</DialogDescription>
        </DialogHeader>

        {txState === "idle" && (
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Recipient</label>
              <Input placeholder="username.btc or SP address" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Amount (STX)</label>
              <Input type="number" min="0" step="0.1" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Message <span className="text-muted-foreground">(optional)</span></label>
              <Input placeholder="Say something nice…" value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>

            {numAmount > 0 && (
              <div className="rounded-lg bg-muted p-3 text-sm space-y-1">
                <div className="flex justify-between text-muted-foreground">
                  <span>Tip amount</span>
                  <span>{numAmount.toFixed(4)} STX</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Network fee</span>
                  <span>{NETWORK_FEE} STX</span>
                </div>
                <div className="flex justify-between font-semibold text-foreground border-t border-border pt-1">
                  <span>Total</span>
                  <span>{total.toFixed(4)} STX</span>
                </div>
              </div>
            )}

            {!wallet && (
              <p className="text-sm text-destructive">Connect your wallet to send a tip.</p>
            )}

            <Button className="w-full gap-2" disabled={!canSend} onClick={handleSend}>
              Send Proof <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {txState === "pending" && (
          <div className="flex flex-col items-center gap-4 py-10">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Broadcasting transaction…</p>
          </div>
        )}

        {txState === "success" && (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Tip Sent!</p>
              <p className="text-sm text-muted-foreground mt-1">{numAmount} STX → {recipient}</p>
            </div>
            <div className="rounded-lg bg-muted px-4 py-2 text-xs font-mono text-muted-foreground">
              Proof ID: {proofId}
            </div>
            <Button variant="outline" size="sm" onClick={() => handleClose(false)}>
              Done
            </Button>
          </div>
        )}

        {txState === "error" && (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/15">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">Transaction Failed</p>
              <p className="text-sm text-muted-foreground mt-1">Network error. Please try again.</p>
            </div>
            <Button size="sm" onClick={() => setTxState("idle")}>
              Retry
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
