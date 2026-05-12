import { useParams, Link } from "react-router-dom";
import { mockTips, truncateAddress } from "@/lib/mock-data";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ProofReceipt() {
  const { id } = useParams<{ id: string }>();
  const tip = mockTips.find((t) => t.id === id);

  if (!tip) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center animate-enter">
        <h1 className="text-2xl font-bold text-foreground mb-2">Proof not found</h1>
        <p className="text-muted-foreground mb-6">This transaction ID doesn't exist.</p>
        <Link to="/">
          <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back Home</Button>
        </Link>
      </div>
    );
  }

  function copyTx() {
    navigator.clipboard.writeText(tip!.txHash);
    toast.success("Transaction hash copied!");
  }