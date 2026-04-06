import { mockTips, truncateAddress, type Tip } from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ProofCard({ tip, index }: { tip: Tip; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      onClick={() => setExpanded(!expanded)}
      className="w-full rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 animate-fade-in"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
      >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <Link
              to={`/profile/${tip.sender}`}
              onClick={(e) => e.stopPropagation()}
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              {tip.sender}
            </Link>
            <span className="text-muted-foreground">→</span>
            <Link
              to={`/profile/${tip.recipient}`}
              onClick={(e) => e.stopPropagation()}
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              {tip.recipient}
            </Link>
          </div>
          {tip.message && (
            <p className="mt-1 text-sm text-muted-foreground truncate">{tip.message}</p>
          )}
    ></button>
    <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-bold text-primary">
            {tip.amount} STX
          </span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(tip.timestamp, { addSuffix: true })}
          </span>
        </div>
      </div>