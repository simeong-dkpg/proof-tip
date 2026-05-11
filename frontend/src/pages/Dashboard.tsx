import { useMemo } from "react";
import { mockTips } from "@/lib/mock-data";
import { useWallet } from "@/contexts/WalletContext";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { format } from "date-fns";
import { Wallet, TrendingUp, Users, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { wallet, connect } = useWallet();
  const navigate = useNavigate();

  // Use alice.btc as dashboard user (matches mock wallet)
  const dashUser = "alice.btc";

  const received = useMemo(() => mockTips.filter((t) => t.recipient === dashUser), []);
  const totalEarned = useMemo(() => received.reduce((s, t) => s + t.amount, 0), [received]);
  const uniqueSupporters = useMemo(() => new Set(received.map((t) => t.sender)).size, [received]);

  const chartData = useMemo(() => {
    const byDay: Record<string, number> = {};
    received.forEach((t) => {
      const day = format(t.timestamp, "MMM d");
      byDay[day] = (byDay[day] || 0) + t.amount;
    });
    return Object.entries(byDay)
      .map(([day, amount]) => ({ day, amount }))
      .reverse();
  }, [received]);

  if (!wallet) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 text-center animate-enter">
        <Wallet className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Connect to view your dashboard</h1>
        <p className="text-muted-foreground mb-6">Connect your wallet to see your earnings and tip history.</p>
        <Button onClick={connect} className="gap-2">
          <Wallet className="h-4 w-4" /> Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 animate-enter">
      <h1 className="text-2xl font-bold text-foreground mb-6">Creator Dashboard</h1>