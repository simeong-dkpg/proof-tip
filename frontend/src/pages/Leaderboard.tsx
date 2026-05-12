import { getLeaderboard } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Trophy, TrendingUp, Award } from "lucide-react";

function MedalIcon({ rank }: { rank: number }) {
  if (rank === 1) return <Trophy className="h-4 w-4 text-accent" />;
  if (rank === 2) return <Award className="h-4 w-4 text-muted-foreground" />;
  if (rank === 3) return <Award className="h-4 w-4 text-primary" />;
  return <span className="text-sm text-muted-foreground w-4 text-center">{rank}</span>;
}

function LeaderboardTable({ type }: { type: "earners" | "tippers" }) {
  const data = getLeaderboard(type);

  return (
    <div className="rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead className="text-right">Total STX</TableHead>
            <TableHead className="text-right">Tips</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((entry, i) => (
            <TableRow key={entry.username}>
              <TableCell>
                <div className="flex items-center justify-center">
                  <MedalIcon rank={i + 1} />
                </div>
              </TableCell>
              <TableCell>
                <Link to={`/profile/${entry.username}`} className="font-medium text-primary hover:underline">
                  {entry.username}
                </Link>
              </TableCell>
              <TableCell className="text-right font-semibold text-foreground">
                {entry.totalSTX.toFixed(1)}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">{entry.tipCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function Leaderboard() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 animate-enter">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-sm text-muted-foreground">Top creators and supporters in the network</p>
        </div>
      </div>