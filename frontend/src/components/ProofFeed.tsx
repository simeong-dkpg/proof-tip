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
    ></button>