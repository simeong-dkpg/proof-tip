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