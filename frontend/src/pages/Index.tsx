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

  const networkStats = useMemo(() => {
    const totalSTX = mockTips.reduce((s, t) => s + t.amount, 0);
    const totalTips = mockTips.length;
    const creators = new Set([...mockTips.map((t) => t.sender), ...mockTips.map((t) => t.recipient)]).size;
    return { totalSTX, totalTips, creators };
  }, []);

  function handleQuickTip() {
    if (!wallet) {
      connect();
      return;
    }
    setModalOpen(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 animate-enter">
      {/* Hero */}
      <section className="mb-12 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-4">
          <Zap className="h-3 w-3" /> On-chain micro-tipping
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Support creators<br />
          <span className="text-primary">with proof.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Send STX tips directly to creators. Every tip is a verifiable on-chain proof of support — transparent, instant, and permanent.
        </p>

        {/* Network Stats */}
        <StatsGrid stats={networkStats} />
      </section>
      <section className="mb-14 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick Tip</h2>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr_1fr_auto]">
          <Input
            placeholder="Recipient (e.g. bob.btc)"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <span className="hidden items-center text-muted-foreground sm:flex">
            <ArrowRight className="h-4 w-4" />
          </span>
          <Input
            type="number"
            min="0"
            step="0.1"
            placeholder="STX amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Input
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button className="gap-2 whitespace-nowrap" onClick={handleQuickTip}>
            Send Proof <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Tip of the Day */}
      <TipOfTheDay />

      {/* Proof Feed */}
      <ProofFeed />

      {/* Send Tip Modal */}
      <SendTipModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        defaultRecipient={recipient}
        defaultAmount={amount}
        defaultMessage={message}
      />
    </div>
  );
}

function StatsGrid({ stats }: { stats: { totalSTX: number; totalTips: number; creators: number } }) {
  const stx = useCountUp(stats.totalSTX, 1200, 1);
  const tips = useCountUp(stats.totalTips, 1000, 0);
  const creators = useCountUp(stats.creators, 800, 0);