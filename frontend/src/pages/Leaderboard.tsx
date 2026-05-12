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