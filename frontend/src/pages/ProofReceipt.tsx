import { useParams, Link } from "react-router-dom";
import { mockTips, truncateAddress } from "@/lib/mock-data";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProofReceipt() {
  const { id } = useParams<{ id: string }>();
  const tip = mockTips.find((t) => t.id === id);

  if (!tip) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center animate-enter">
        <h1 className="text-2xl font-bold text-foreground mb-2">Proof not found</h1>
        <p className="text-muted-foreground mb-6">This transaction ID doesn't exist.</p>
        <Link to="/">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back Home</Button>
        </Link>
      </div>
    );
  }

  function copyTx() {
    navigator.clipboard.writeText(tip!.txHash);
    toast.success("Transaction hash copied!");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 animate-enter">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Feed
      </Link>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        {/* Status */}
        <div className="flex items-center gap-2 mb-6">
          <CheckCircle2 className="h-5 w-5 text-accent" />
          <span className="text-sm font-semibold text-accent">Confirmed On-Chain</span>
        </div>

        {/* Amount */}
        <div className="text-center mb-8">
          <p className="text-4xl font-extrabold text-foreground">{tip.amount.toFixed(1)} STX</p>
          <p className="text-sm text-muted-foreground mt-1">{format(tip.timestamp, "PPpp")}</p>
        </div>

        {/* Sender → Recipient */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-center">
            <Link to={`/profile/${tip.sender}`} className="text-sm font-semibold text-primary hover:underline">
              {tip.sender}
            </Link>
            <p className="text-xs text-muted-foreground">{truncateAddress(tip.senderAddress)}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
          <div className="text-center">
            <Link to={`/profile/${tip.recipient}`} className="text-sm font-semibold text-primary hover:underline">
              {tip.recipient}
            </Link>
            <p className="text-xs text-muted-foreground">{truncateAddress(tip.recipientAddress)}</p>
          </div>
        </div>

        {/* Message */}
        {tip.message && (
          <div className="rounded-xl bg-muted/50 p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Message</p>
            <p className="text-foreground">{tip.message}</p>
          </div>
        )}

        {/* Details */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Proof ID</span>
            <span className="font-mono text-foreground">{tip.id}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tx Hash</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-foreground">{tip.txHash}</span>
              <button onClick={copyTx} className="text-muted-foreground hover:text-foreground">
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Network Fee</span>
            <span className="text-foreground">0.001 STX</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Block</span>
            <span className="text-foreground">#{Math.floor(Math.random() * 50000 + 150000)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-center gap-4">
          <a
            href={`https://explorer.stacks.co/txid/${tip.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            View on Explorer <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <span className="text-border">|</span>
          <button
            onClick={() => {
              const text = `I just tipped ${tip.recipient} ${tip.amount} STX on ProofTip! 🧾⚡\n\nMessage: "${tip.message}"\n\nVerify on-chain: ${window.location.href}`;
              if (navigator.share) {
                navigator.share({ title: "ProofTip Receipt", text, url: window.location.href });
              } else {
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                window.open(twitterUrl, "_blank");
              }
            }}
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
          >
            Share <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
