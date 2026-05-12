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