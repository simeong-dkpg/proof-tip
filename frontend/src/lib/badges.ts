import { mockTips } from "@/lib/mock-data";
import { Award, Flame, Heart, Rocket, Star, Target, TrendingUp, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Badge {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  color: string; // tailwind text color token
}

const BADGE_DEFS: (Badge & { check: (u: string) => boolean })[] = [
  {
    id: "first-tip",
    label: "First Proof",
    description: "Sent your first tip",
    icon: Zap,
    color: "text-primary",
    check: (u) => mockTips.some((t) => t.sender === u),
  },
  {
    id: "first-received",
    label: "First Fan",
    description: "Received your first tip",
    icon: Heart,
    color: "text-destructive",
    check: (u) => mockTips.some((t) => t.recipient === u),
  },
  {
    id: "5-sent",
    label: "Generous",
    description: "Sent 5+ tips",
    icon: Star,
    color: "text-accent",
    check: (u) => mockTips.filter((t) => t.sender === u).length >= 5,
  },
  {
    id: "10-sent",
    label: "Power Tipper",
    description: "Sent 10+ tips",
    icon: Rocket,
    color: "text-primary",
    check: (u) => mockTips.filter((t) => t.sender === u).length >= 10,
  },
  {
    id: "5-received",
    label: "Rising Star",
    description: "Received 5+ tips",
    icon: TrendingUp,
    color: "text-accent",
    check: (u) => mockTips.filter((t) => t.recipient === u).length >= 5,
  },
  {
    id: "10-stx-earned",
    label: "10 STX Club",
    description: "Earned 10+ STX in tips",
    icon: Target,
    color: "text-primary",
    check: (u) =>
      mockTips.filter((t) => t.recipient === u).reduce((s, t) => s + t.amount, 0) >= 10,
  },
  {
    id: "100-stx-earned",
    label: "Whale Earner",
    description: "Earned 100+ STX in tips",
    icon: Award,
    color: "text-accent",
    check: (u) =>
      mockTips.filter((t) => t.recipient === u).reduce((s, t) => s + t.amount, 0) >= 100,
  },
  {
    id: "streak",
    label: "On Fire",
    description: "Active in 3+ unique days",
    icon: Flame,
    color: "text-destructive",
    check: (u) => {
      const days = new Set(
        mockTips
          .filter((t) => t.sender === u || t.recipient === u)
          .map((t) => t.timestamp.toDateString())
      );
      return days.size >= 3;
    },
  },
];

export function getUserBadges(username: string): Badge[] {
  return BADGE_DEFS.filter((b) => b.check(username)).map(({ check, ...badge }) => badge);
}
