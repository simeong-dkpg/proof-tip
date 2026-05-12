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