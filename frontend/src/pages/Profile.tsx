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

  const initials = username.replace(".btc", "").slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 animate-enter">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
        <Avatar className="h-16 w-16 text-xl">
          <AvatarFallback className="bg-primary/10 text-primary font-bold">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-foreground">{username}</h1>
          {stats.address && (
            <p className="text-sm text-muted-foreground font-mono">{truncateAddress(stats.address)}</p>
          )}
        </div>
        <Button className="gap-2" onClick={() => setModalOpen(true)}>
          Send Tip <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Coins className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.totalReceived.toFixed(1)} STX</p>
            <p className="text-xs text-muted-foreground">Total Received</p>
          </div>
        </Card>