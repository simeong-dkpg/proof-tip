import { mockTips } from "@/lib/mock-data";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Star, ArrowRight } from "lucide-react";

export default function TipOfTheDay() {
  const tip = [...mockTips].sort((a, b) => b.amount - a.amount)[0];
  if (!tip) return null;