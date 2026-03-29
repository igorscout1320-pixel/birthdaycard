import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TemplateCard from "../components/TemplateCard";
import ColorPicker from "../components/ColorPicker";
import CardPreview from "../components/CardPreview";
import { base44 } from "@/api/base44Client";

const templates = [
  { id: "classic", name: "Classic" },
  { id: "balloons", name: "Balloons" },
  { id: "confetti", name: "Confetti" },
  { id: "floral", name: "Floral" },
  { id: "minimal", name: "Minimal" },
  { id: "neon", name: "Neon Glow" },
];

const fontOptions = [
  { id: "elegant", label: "Elegant", className: "font-display" },
  { id: "playful", label: "Playful", className: "font-body font-bold" },
  { id: "bold", label: "Bold", className: "font-body font-extrabold uppercase text-xs tracking-wider" },
  { id: "handwritten", label: "Script", className: "font-script" },
];

const steps = ["Template", "Details", "Style", "Preview"];

export default function CreateCard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [card, setCard] = useState({
    template: "classic",
    recipient_name: "",
    sender_name: "",
    message: "Wishing you the happiest of birthdays filled with love, laughter, and all your favorite things! 🎉",
    color_scheme: "gold",
    font_style: "elegant",
  });

  const update = (field, value) => setCard((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    const created = await base44.entities.BirthdayCard.create(card);
    setSaving(false);
    navigate(`/my-cards`);
  };

  const canNext = () => {
    if (step === 0) return !!card.template;
    if (step === 1) return !!card.recipient_name.trim();
    return true;
  };

  return (
    <div className="px-4 pb-8">
      {/* Progress */}
      <div className="mt-4 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${
              i <= step ? "bg-primary" : "bg-muted"
            }`} />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 mb-6">
        {steps.map((s, i) => (
          <span key={s} className={`text-[10px] font-medium transition-colors ${
            i <= step ? "text-primary" : "text-muted-foreground"
          }`}>
            {s}
          </span>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Template */}
        {step === 0 && (
          <motion.div
            key="template"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
          >
            <h2 className="font-display text-xl font-bold text-foreground mb-1">Choose a Template</h2>
            <p className="text-sm text-muted-foreground mb-5">Pick a style that fits the vibe</p>
            <div className="grid grid-cols-3 gap-3">
              {templates.map((t) => (
                <TemplateCard
                  key={t.id}
                  template={t.id}
                  name={t.name}
                  selected={card.template === t.id}
                  onClick={() => update("template", t.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Details */}
        {step === 1 && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="space-y-5"
          >
            <div>
              <h2 className="font-display text-xl font-bold text-foreground mb-1">Personalize It</h2>
              <p className="text-sm text-muted-foreground mb-5">Add the personal touches</p>
            </div>
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium">Who's the birthday star? *</Label>
              <Input
                placeholder="Enter their name"
                value={card.recipient_name}
                autoCapitalize="words"
                autoCorrect="off"
                onChange={(e) => update("recipient_name", e.target.value)}
                className="rounded-xl min-h-[44px] h-12 font-body"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium">Your name (optional)</Label>
              <Input
                placeholder="Sign the card"
                value={card.sender_name}
                autoCapitalize="words"
                autoCorrect="off"
                onChange={(e) => update("sender_name", e.target.value)}
                className="rounded-xl min-h-[44px] h-12 font-body"
              />
            </div>
            <div className="space-y-2">
              <Label className="font-body text-sm font-medium">Your message</Label>
              <Textarea
                placeholder="Write your message here..."
                value={card.message}
                onChange={(e) => update("message", e.target.value)}
                className="rounded-xl min-h-[88px] h-auto font-body"
              />
