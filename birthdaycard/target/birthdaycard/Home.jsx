import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle, Sparkles, Heart, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Palette,
    title: "6 Templates",
    desc: "Beautiful designs for every style",
  },
  {
    icon: Heart,
    title: "Personalize",
    desc: "Add names, messages & colors",
  },
  {
    icon: Sparkles,
    title: "Share Joy",
    desc: "Send cards to loved ones",
  },
];

export default function Home() {
  return (
    <div className="px-4 pb-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mt-6 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-8"
      >
        <div className="absolute top-4 right-4">
          <motion.span
            className="text-5xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎂
          </motion.span>
        </div>
        <div className="absolute bottom-4 left-6">
          <motion.span
            className="text-3xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🎈
          </motion.span>
        </div>

        <div className="relative z-10">
          <h1 className="font-display text-3xl font-bold text-foreground leading-tight">
            Create<br />
            <span className="text-primary">Beautiful</span><br />
            Birthday Cards
          </h1>
          <p className="mt-3 text-sm text-muted-foreground font-body leading-relaxed max-w-[240px]">
            Design stunning personalized cards in seconds and share the joy.
          </p>
          <Link to="/create">
            <Button className="mt-5 rounded-full px-6 h-12 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 font-body font-semibold text-sm">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create a Card
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Features */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        {features.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className="bg-card rounded-2xl border border-border/50 p-4 text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <feat.icon className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-body font-semibold text-xs text-foreground">{feat.title}</h3>
            <p className="mt-1 text-[10px] text-muted-foreground leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Templates Preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg text-foreground">Popular Templates</h2>
          <Link to="/create" className="text-xs text-primary font-medium">
            See all →
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {[
            { emoji: "🎂", name: "Classic", gradient: "from-amber-100 to-orange-50" },
            { emoji: "🎈", name: "Balloons", gradient: "from-sky-100 to-blue-50" },
            { emoji: "🎉", name: "Confetti", gradient: "from-pink-100 to-purple-50" },
            { emoji: "🌸", name: "Floral", gradient: "from-rose-100 to-pink-50" },
          ].map((t, i) => (
            <Link key={t.name} to="/create">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className={`flex-shrink-0 w-32 aspect-[3/4] rounded-2xl bg-gradient-to-br ${t.gradient} flex flex-col items-center justify-center gap-2 border border-white/50 shadow-sm`}
              >
                <span className="text-3xl">{t.emoji}</span>
                <span className="text-xs font-medium text-foreground/70">{t.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 text-center border border-primary/10"
      >
        <span className="text-3xl">💌</span>
        <h3 className="font-display font-semibold text-foreground mt-2">Spread the Love</h3>
        <p className="text-xs text-muted-foreground mt-1 mb-4">
          Make someone's day extra special with a handcrafted birthday card
        </p>
        <Link to="/create">
          <Button variant="outline" className="rounded-full px-6 border-primary/20 text-primary hover:bg-primary/5 font-body text-sm">
            Get Started
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}