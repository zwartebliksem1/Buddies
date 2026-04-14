import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shuffle, Play, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const TASKS = [
  { key: "handstandSplit", emoji: "🤸", duration: 60, pack: "athletic" },
  { key: "stackItems", emoji: "🧱", duration: 20, pack: "familyFun" },
  { key: "reverseAlphabet", emoji: "🔤", duration: 60, pack: "familyFun" },
  { key: "buildPaperTower", emoji: "🗼", duration: 90, pack: "familyFun" },
  { key: "mirrorStretch", emoji: "🧘", duration: 60, pack: "athletic" },
  { key: "silentLineup", emoji: "🤐", duration: 45, pack: "spicy" },
  { key: "jointStory", emoji: "📖", duration: 120, pack: "familyFun" },
  { key: "balanceBookWalk", emoji: "📚", duration: 60, pack: "athletic" },
  { key: "clapPattern", emoji: "👏", duration: 45, pack: "familyFun" },
  { key: "colorHunt", emoji: "🎨", duration: 60, pack: "familyFun" },
  { key: "roomSketch", emoji: "✏️", duration: 120, pack: "familyFun" },
  { key: "oneBreathHum", emoji: "🎵", duration: 30, pack: "spicy" },
  { key: "shadowShapes", emoji: "🖐️", duration: 60, pack: "familyFun" },
  { key: "kindnessSprint", emoji: "💛", duration: 90, pack: "spicy" },
  { key: "teamOrigami", emoji: "📄", duration: 120, pack: "familyFun" },
  { key: "rhythmWave", emoji: "🥁", duration: 60, pack: "familyFun" },
  { key: "memoryTray", emoji: "🧠", duration: 75, pack: "spicy" },
  { key: "whisperRelay", emoji: "🗣️", duration: 60, pack: "spicy" },
  { key: "miniSong", emoji: "🎶", duration: 90, pack: "spicy" },
  { key: "sockBasket", emoji: "🧦", duration: 60, pack: "athletic" },
  { key: "puzzleSprint", emoji: "🧩", duration: 120, pack: "familyFun" },
  { key: "coinTrail", emoji: "🪙", duration: 90, pack: "familyFun" },
  { key: "statueSwitch", emoji: "🗿", duration: 45, pack: "spicy" },
  { key: "objectAlphabet", emoji: "🔠", duration: 120, pack: "familyFun" },
  { key: "gratitudeList", emoji: "🙏", duration: 90, pack: "spicy" },
  { key: "emojiCharadesTogether", emoji: "😄", duration: 90, pack: "spicy" },
  { key: "cupPyramid", emoji: "🥤", duration: 75, pack: "familyFun" },
  { key: "backwardsCount", emoji: "🔢", duration: 45, pack: "familyFun" },
  { key: "paperBridge", emoji: "🌉", duration: 120, pack: "familyFun" },
  { key: "spoonTransfer", emoji: "🥄", duration: 60, pack: "athletic" },
  { key: "mirrorDrawing", emoji: "🖍️", duration: 90, pack: "spicy" },
  { key: "teamPoem", emoji: "📝", duration: 120, pack: "spicy" },
  { key: "deepBreaths", emoji: "🌬️", duration: 30, pack: "athletic" },
  { key: "towelFoldChallenge", emoji: "🧺", duration: 75, pack: "familyFun" },
  { key: "blindBuild", emoji: "🧱", duration: 120, pack: "spicy" },
  { key: "complimentEcho", emoji: "🫶", duration: 60, pack: "spicy" },
  { key: "shapeWithBodies", emoji: "⭐", duration: 60, pack: "athletic" },
  { key: "deskDrumBeat", emoji: "🪘", duration: 60, pack: "athletic" },
  { key: "mapToSnack", emoji: "🗺️", duration: 120, pack: "familyFun" },
  { key: "towerOfCards", emoji: "🃏", duration: 120, pack: "familyFun" },
  { key: "scavengerThree", emoji: "🔎", duration: 90, pack: "familyFun" },
  { key: "miniYogaFlow", emoji: "🧘", duration: 90, pack: "athletic" },
  { key: "planPicnic", emoji: "🧺", duration: 120, pack: "familyFun" },
  { key: "inventHandshake", emoji: "🤝", duration: 60, pack: "spicy" },
  { key: "speedCleanup", emoji: "🧽", duration: 90, pack: "athletic" },
  { key: "photoPoseSeries", emoji: "📸", duration: 60, pack: "spicy" },
  { key: "backwardsSong", emoji: "🎤", duration: 60, pack: "spicy" },
  { key: "alphabetCategories", emoji: "🔡", duration: 90, pack: "familyFun" },
  { key: "penBalancePartner", emoji: "🖊️", duration: 60, pack: "athletic" },
  { key: "paperAirplaneFleet", emoji: "🛩️", duration: 120, pack: "familyFun" },
  { key: "matchTempoSteps", emoji: "👣", duration: 60, pack: "athletic" },
  { key: "storyWithFiveWords", emoji: "🧾", duration: 90, pack: "spicy" },
  { key: "silentMovieScene", emoji: "🎬", duration: 90, pack: "spicy" },
];

function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function PairReveal({ players, selectedPackages, onStartTimer, onBack }) {
  const { t } = useI18n();
  const [pair, setPair] = useState([]);
  const [task, setTask] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const pickNew = () => {
    const pool = TASKS.filter((taskItem) => selectedPackages.includes(taskItem.pack));
    const newPair = pickRandom(players, 2);
    const newTask = pool[Math.floor(Math.random() * pool.length)] ?? TASKS[0];
    setPair(newPair);
    setTask(newTask);
    setRevealed(false);
    setTimeout(() => setRevealed(true), 50);
  };

  useEffect(() => {
    pickNew();
  }, [selectedPackages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto text-center"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("common.back")}
      </button>

      <h2 className="font-heading text-2xl font-bold text-foreground mb-8">{t("pairReveal.title")}</h2>

      <p className="font-body text-xs text-muted-foreground mb-6">
        {t("pairReveal.mixLabel")} {selectedPackages.map((packKey) => t(`packages.${packKey}`)).join(", ")}
      </p>

      <AnimatePresence mode="wait">
        {revealed && pair.length === 2 && (
          <motion.div
            key={`${pair[0]}-${pair[1]}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="mb-8"
          >
            {/* Players */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center font-heading font-bold text-primary text-2xl">
                  {pair[0][0].toUpperCase()}
                </div>
                <span className="font-heading font-semibold text-foreground">{pair[0]}</span>
              </div>

              <span className="font-heading text-2xl font-bold text-muted-foreground">&</span>

              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center font-heading font-bold text-accent text-2xl">
                  {pair[1][0].toUpperCase()}
                </div>
                <span className="font-heading font-semibold text-foreground">{pair[1]}</span>
              </div>
            </div>

            {/* Task */}
            {task && (
              <div className="bg-card border border-border rounded-2xl px-6 py-4">
                <p className="font-body text-sm text-muted-foreground mb-1">{t("pairReveal.challenge")}</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">{task.emoji}</span>
                  <span className="font-heading font-bold text-xl text-foreground">{t(`tasks.${task.key}`)}</span>
                </div>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {task.duration >= 60
                    ? `${task.duration / 60} ${t("common.minuteShort")}`
                    : `${task.duration}${t("common.secondShort")}`}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        <Button
          onClick={pickNew}
          variant="outline"
          className="flex-1 h-14 rounded-2xl font-heading font-bold border-2"
        >
          <Shuffle className="w-5 h-5 mr-2" />
          {t("pairReveal.shuffle")}
        </Button>
        {task && (
          <Button
            onClick={() => onStartTimer(pair, task)}
            className="flex-1 h-14 rounded-2xl font-heading font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
          >
            <Play className="w-5 h-5 mr-2" />
            {t("pairReveal.start")}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

