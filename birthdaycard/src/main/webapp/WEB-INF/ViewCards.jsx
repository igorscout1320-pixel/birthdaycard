import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, Share2, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import CardPreview from "../components/CardPreview";
import { base44 } from "@/api/base44Client";
import { toast } from "sonner";

export default function ViewCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const load = async () => {
      const cards = await base44.entities.BirthdayCard.filter({ id });
      if (cards.length > 0) {
        setCard(cards[0]);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const handleDelete = async () => {
    await base44.entities.BirthdayCard.delete(id);
    navigate("/my-cards");
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Birthday Card for ${card.recipient_name}`,
        text: card.message,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center px-4">
        <p className="text-muted-foreground">Card not found</p>
        <Button variant="outline" onClick={() => navigate("/my-cards")} className="mt-4 rounded-full font-body">
          Back to My Cards
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 pb-8">
      {/* Header */}
      <div className="mt-4 flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate("/my-cards")} className="rounded-full font-body">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleShare} className="rounded-full w-9 h-9">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setShowDelete(true)} className="rounded-full w-9 h-9 text-destructive hover:text-destructive">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[320px] mx-auto"
      >
        <CardPreview
          template={card.template}
          recipientName={card.recipient_name}
          senderName={card.sender_name}
          message={card.message}
          colorScheme={card.color_scheme}
          fontStyle={card.font_style}
        />
      </motion.div>

      {/* Card info */}
      <div className="mt-6 text-center">
        <h2 className="font-display font-semibold text-lg text-foreground">
          For {card.recipient_name}
        </h2>
        {card.sender_name && (
          <p className="text-sm text-muted-foreground">From {card.sender_name}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Created {new Date(card.created_date).toLocaleDateString("en-US", { 
            month: "long", day: "numeric", year: "numeric" 
          })}
        </p>
      </div>

      {/* Share CTA */}
      <div className="mt-6">
        <Button
          onClick={handleShare}
          className="w-full rounded-full h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 font-body font-semibold"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share This Card
        </Button>
      </div>

      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent className="rounded-2xl max-w-[320px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Delete Card?</AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm">
              This will permanently remove this card.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full font-body">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="rounded-full bg-destructive hover:bg-destructive/90 font-body">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}