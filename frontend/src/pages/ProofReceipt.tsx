import { useParams, Link } from "react-router-dom";
import { mockTips, truncateAddress } from "@/lib/mock-data";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";