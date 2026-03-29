import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Trash2, Loader2, FolderOpen } from "lucide-react";
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
import PullToRefresh from "../components/PullToRefresh";
import { base44 } from "@/api/base44Client";

export default function MyCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const loadCards = async () => {
    setLoading(true);
    const data = await base44.entities.BirthdayCard.list("-created_date");
    setCards(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCards();
  }, []);

  const handleDelete = async () => {
    const idToDelete = deleteId;
    setDeleteId(null);
    setCards((prev) => prev.filter((c) => c.id !== idToDelete));
    await base44.entities.BirthdayCard.delete(idToDelete);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <PullToRefresh onRefresh={loadCards}>
    <div className="px-4 pb-8">
      <div className="mt-6 flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-xl font-bold text-foreground">My Cards</h1>
          <p className="text-sm text-muted-foreground">{cards.length} card{cards.length !== 1 ? "s" : ""} created</p>
        </div>
        <Link to="/create">
          <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 font-body">
            <PlusCircle className="w-4 h-4 mr-1" />
            New
          </Button>
        </Link>
      </div>

      {cards.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
            <FolderOpen className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="font-display font-semibold text-foreground">No cards yet</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-6 max-w-[240px]">
            Create your first birthday card and make someone's day special!
          </p>
          <Link to="/create">
            <Button className="rounded-full px-6 bg-primary hover:bg-primary/90 font-body">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Your First Card
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative group"
            >
              <Link to={`/card/${card.id}`}>
                <CardPreview
                  template={card.template}
                  recipientName={card.recipient_name}
                  senderName={card.sender_name}
                  message={card.message}
                  colorScheme={card.color_scheme}
                  fontStyle={card.font_style}
                  compact
                />
              </Link>
              <button
                onClick={() => setDeleteId(card.id)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-3.5 h-3.5 text-white" />
              </button>
              <p className="mt-2 text-xs font-medium text-foreground truncate">
                For {card.recipient_name}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {new Date(card.created_date).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="rounded-2xl max-w-[320px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">Delete Card?</AlertDialogTitle>
            <AlertDialogDescription className="font-body text-sm">
              This card will be permanently removed. This action cannot be undone.
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
    </PullToRefresh>
  );
}