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
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15">
              <TrendingUp className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Earned</p>
              <p className="text-2xl font-bold text-foreground">{totalEarned.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">STX</span></p>
            </div>
            </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Supporters</p>
              <p className="text-2xl font-bold text-foreground">{uniqueSupporters}</p>
            </div>
          </CardContent>
        </Card>
        {/* Network Volume Chart */}
      {networkVolumeData.length > 0 && (
        <Card className="mb-8">
          <CardContent className="p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Network Tip Volume</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={networkVolumeData}></AreaChart>
                <defs>
                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                      color: "hsl(var(--foreground))",
                    }}
                    formatter={(value: number, name: string) => [
                      name === "stx" ? `${value} STX` : `${value} tips`,
                      name === "stx" ? "Volume" : "Tips",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="stx"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#volumeGradient)"
                  />
                </AreaChart>
                </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {chartData.length > 0 && (
        <Card className="mb-8">
          <CardContent className="p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Your Tips Over Time</h2>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`${value} STX`, "Amount"]}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tip History Table */}
      <Card>
        <CardContent className="p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Tip History</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="hidden sm:table-cell">Message</TableHead>
              </TableRow>
            </TableHeader>