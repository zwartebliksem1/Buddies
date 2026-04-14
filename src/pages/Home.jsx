import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PlayerEntry from "../components/game/PlayerEntry";
import PackageSelect from "../components/game/PackageSelect";
import PairReveal from "../components/game/PairReveal";
import TaskTimer from "../components/game/TaskTimer";

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState(["familyFun"]);
  const [mixedPackagesEnabled, setMixedPackagesEnabled] = useState(false);
  const [screen, setScreen] = useState("entry"); // entry, packages, reveal, timer
  const [currentPair, setCurrentPair] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [revealKey, setRevealKey] = useState(0);

  const handleGoToPackages = () => {
    setScreen("packages");
  };

  const handleStartGame = () => {
    setRevealKey((k) => k + 1);
    setScreen("reveal");
  };

  const handleStartTimer = (pair, task) => {
    setCurrentPair(pair);
    setCurrentTask(task);
    setScreen("timer");
  };

  const handleTimerDone = () => {
    setRevealKey((k) => k + 1);
    setScreen("reveal");
  };

  const handleBackToEntry = () => {
    setScreen("entry");
  };

  const handleBackToPackages = () => {
    setScreen("packages");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Decorative gradient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative flex-1 flex items-center justify-center px-5 py-10">
        <AnimatePresence mode="wait">
          {screen === "entry" && (
            <motion.div
              key="entry"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <PlayerEntry
                players={players}
                setPlayers={setPlayers}
                onStart={handleGoToPackages}
              />
            </motion.div>
          )}

          {screen === "packages" && (
            <motion.div
              key="packages"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <PackageSelect
                selectedPackages={selectedPackages}
                setSelectedPackages={setSelectedPackages}
                mixedPackagesEnabled={mixedPackagesEnabled}
                setMixedPackagesEnabled={setMixedPackagesEnabled}
                onBack={handleBackToEntry}
                onStartGame={handleStartGame}
              />
            </motion.div>
          )}

          {screen === "reveal" && (
            <motion.div
              key={`reveal-${revealKey}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <PairReveal
                players={players}
                selectedPackages={selectedPackages}
                onStartTimer={handleStartTimer}
                onBack={handleBackToPackages}
              />
            </motion.div>
          )}

          {screen === "timer" && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <TaskTimer
                pair={currentPair}
                task={currentTask}
                onDone={handleTimerDone}
                onBack={() => setScreen("reveal")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}