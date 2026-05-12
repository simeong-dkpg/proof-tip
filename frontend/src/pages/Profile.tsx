import { useParams, Link } from "react-router-dom";
import { getCreatorStats, truncateAddress, type Tip } from "@/lib/mock-data";
import { getUserBadges } from "@/lib/badges";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import SendTipModal from "@/components/SendTipModal";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Heart, Users, Coins } from "lucide-react";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const [modalOpen, setModalOpen] = useState(false);

  if (!username) return null;

  const stats = getCreatorStats(username);
  const badges = getUserBadges(username);

  if (stats.tipCount === 0 && stats.address === "") {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center animate-enter">
        <h1 className="text-2xl font-bold text-foreground mb-2">Creator not found</h1>
        <p className="text-muted-foreground mb-6">No tip data found for "{username}".</p>
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    );
  }