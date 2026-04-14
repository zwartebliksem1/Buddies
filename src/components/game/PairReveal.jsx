import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shuffle, Play, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TASKS = [
  { name: "Rock Paper Scissors", emoji: "✂️", duration: 60 },
  { name: "Staring Contest", emoji: "👀", duration: 30 },
  { name: "Thumb War", emoji: "👍", duration: 60 },
  { name: "Tell a Joke", emoji: "😂", duration: 90 },
  { name: "Compliment Battle", emoji: "💬", duration: 60 },
  { name: "Air Guitar Solo", emoji: "🎸", duration: 30 },
  { name: "Best Dance Move", emoji: "💃", duration: 30 },
  { name: "Arm Wrestling", emoji: "💪", duration: 30 },
  { name: "Trivia Duel", emoji: "🧠", duration: 120 },
  { name: "Best Impression", emoji: "🎭", duration: 60 },
  { name: "Whisper Challenge", emoji: "🤫", duration: 90 },
  { name: "Two Truths One Lie", emoji: "🤥", duration: 120 },
];

function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function PairReveal({ players, onStartTimer, onBack }) {
  const [pair, setPair] = useState([]);
  const [task, setTask] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const pickNew = () => {
    const newPair = pickRandom(players, 2);
    const newTask = TASKS[Math.floor(Math.random() * TASKS.length)];
    setPair(newPair);
    setTask(newTask);
    setRevealed(false);
    setTimeout(() => setRevealed(true), 50);
  };

  useEffect(() => {
    pickNew();
  }, []);

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
        Back
      </button>

      <h2 className="font-heading text-2xl font-bold text-foreground mb-8">This Round's Pair</h2>

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

              <span className="font-heading text-2xl font-bold text-muted-foreground">VS</span>

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
                <p className="font-body text-sm text-muted-foreground mb-1">Their challenge:</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">{task.emoji}</span>
                  <span className="font-heading font-bold text-xl text-foreground">{task.name}</span>
                </div>
                <p className="font-body text-sm text-muted-foreground mt-1">
                  {task.duration >= 60
                    ? `${task.duration / 60} min${task.duration > 60 ? "s" : ""}`
                    : `${task.duration}s`}
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
          Shuffle
        </Button>
        {task && (
          <Button
            onClick={() => onStartTimer(pair, task)}
            className="flex-1 h-14 rounded-2xl font-heading font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
          >
            <Play className="w-5 h-5 mr-2" />
            Start!
          </Button>
        )}
      </div>
    </motion.div>
  );
}

