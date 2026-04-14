import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlayerEntry({ players, setPlayers, onStart }) {
  const [name, setName] = useState("");

  const addPlayer = () => {
    const trimmed = name.trim();
    if (trimmed && !players.includes(trimmed)) {
      setPlayers([...players, trimmed]);
      setName("");
    }
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addPlayer();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-10">
        <h1 className="font-heading text-5xl sm:text-6xl font-900 tracking-tight text-foreground">
          Buddies
        </h1>
        <p className="font-body text-muted-foreground mt-3 text-lg">
          Add your players and let the chaos begin
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter player name..."
          className="h-14 text-lg font-body rounded-2xl bg-card border-2 border-border focus:border-primary px-5"
        />
        <Button
          onClick={addPlayer}
          disabled={!name.trim()}
          className="h-14 w-14 rounded-2xl shrink-0 bg-primary hover:bg-primary/90"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      <div className="space-y-2 mb-8 min-h-[100px]">
        <AnimatePresence mode="popLayout">
          {players.map((player, index) => (
            <motion.div
              key={player}
              layout
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex items-center justify-between bg-card border border-border rounded-2xl px-5 py-3.5"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center font-heading font-bold text-secondary-foreground text-sm">
                  {player[0].toUpperCase()}
                </div>
                <span className="font-body font-medium text-foreground text-lg">{player}</span>
              </div>
              <button
                onClick={() => removePlayer(index)}
                className="w-8 h-8 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {players.length === 0 && (
          <div className="text-center py-10 text-muted-foreground font-body">
            No players yet — add at least 2 to play!
          </div>
        )}
      </div>

      {players.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button
            onClick={onStart}
            className="w-full h-16 rounded-2xl text-xl font-heading font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Pick a Pair!
          </Button>
        </motion.div>
      )}

      {players.length === 1 && (
        <p className="text-center text-muted-foreground font-body text-sm">
          Add 1 more player to get started
        </p>
      )}
    </motion.div>
  );
}