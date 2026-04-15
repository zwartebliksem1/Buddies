import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, ArrowLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function TaskTimer({ pair, task, onDone, onBack }) {
  const { t } = useI18n();
  const [timeLeft, setTimeLeft] = useState(task.duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wordRevealed, setWordRevealed] = useState(false);
  const intervalRef = useRef(null);

  const total = task.duration;
  const progress = ((total - timeLeft) / total) * 100;

  const cleanup = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            cleanup();
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return cleanup;
  }, [isRunning, cleanup]);

  useEffect(() => {
    setWordRevealed(false);
  }, [task]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    cleanup();
    setTimeLeft(task.duration);
    setIsRunning(false);
    setIsFinished(false);
    setWordRevealed(false);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Circle progress
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full h-full max-w-md mx-auto flex flex-col pt-2"
    >
      <div className="shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("common.back")}
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto flex flex-col justify-center pb-8 text-center">
        <div className="w-full">
          {/* Pair names */}
          <div className="flex items-center justify-center gap-2 mb-2">
        <span className="font-heading text-xl font-bold text-primary">{pair[0]}</span>
        <span className="text-muted-foreground font-heading">&</span>
        <span className="font-heading text-xl font-bold text-accent">{pair[1]}</span>
      </div>

      {/* Task name */}
      <div className="mb-4">
        <span className="text-3xl mr-2">{task.emoji}</span>
        <span className="font-heading text-lg font-semibold text-foreground">{t(`tasks.${task.key}`)}</span>
      </div>

      {task.hasHiddenWord && (
        <div className="mb-8 min-h-[3rem]">
          {!wordRevealed ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setWordRevealed(true)}
              className="rounded-full shadow-sm font-body text-sm"
            >
              {t("common.revealWord")}
            </Button>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-2 inline-block font-heading font-bold text-primary tracking-wide text-lg shadow-sm"
            >
              <span className="text-muted-foreground font-body font-normal text-xs mr-2 uppercase tracking-widest">{t("common.hiddenWord")}</span>
              {task.hiddenWord}
            </motion.div>
          )}
        </div>
      )}

      {/* Timer Circle */}
      <div className="relative w-72 h-72 mx-auto mb-10">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 300 300">
          {/* Background circle */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="12"
          />
          {/* Progress circle */}
          <circle
            cx="150"
            cy="150"
            r={radius}
            fill="none"
            stroke={isFinished ? "hsl(var(--accent))" : "hsl(var(--primary))"}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isFinished ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-6xl mb-2">🎉</div>
              <p className="font-heading text-xl font-bold text-accent">{t("common.timeUp")}</p>
            </motion.div>
          ) : (
            <>
              <span className="font-heading text-6xl font-bold text-foreground tabular-nums tracking-tight">
                {formatTime(timeLeft)}
              </span>
            </>
          )}
        </div>
      </div>

        </div>
      </div>

      {/* Controls */}
      <div className="shrink-0 pt-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-background via-background/95 to-transparent">
        {isFinished ? (
          <div className="flex gap-3">
            <Button
              onClick={resetTimer}
              variant="outline"
              className="flex-1 h-14 rounded-2xl font-heading font-bold text-lg border-2"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              {t("common.retry")}
            </Button>
            <Button
              onClick={onDone}
              className="flex-1 h-14 rounded-2xl font-heading font-bold text-lg bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
            >
              <Check className="w-5 h-5 mr-2" />
              {t("common.nextRound")}
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button
              onClick={resetTimer}
              variant="outline"
              className="h-14 w-14 rounded-2xl border-2 shrink-0"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button
              onClick={toggleTimer}
              className="flex-1 h-14 rounded-2xl font-heading font-bold text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  {t("common.pause")}
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  {timeLeft < task.duration ? t("common.resume") : t("common.start")}
                </>
              )}
            </Button>
            <Button
              onClick={onDone}
              className="flex-1 h-14 rounded-2xl font-heading font-bold text-lg bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
            >
              <Check className="w-5 h-5 mr-2" />
              {t("common.done")}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}