import { mockTips } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Star, ArrowRight } from "lucide-react";

export default function TipOfTheDay() {
  const tip = [...mockTips].sort((a, b) => b.amount - a.amount)[0];
  if (!tip) return null;

  return (
    <section className="mb-10 animate-fade-in">
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Tip of the Day</span>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-sm">
              <Link to={`/profile/${tip.sender}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                {tip.sender}
              </Link>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <Link to={`/profile/${tip.recipient}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                {tip.recipient}
              </Link>
            </div>
            {tip.message && (
              <p className="mt-1 text-sm text-muted-foreground">"{tip.message}"</p>
            )}
            <p className="mt-1 text-xs text-muted-foreground">
              {formatDistanceToNow(tip.timestamp, { addSuffix: true })}
            </p>
          </div>
          <span className="rounded-full bg-primary/15 px-4 py-1.5 text-lg font-bold text-primary shrink-0">
            {tip.amount} STX
          </span>
        </div>
      </div>
    </section>
  );
}
