import { Button } from "@/components/ui/button";
import { ArrowLeft, Flame, Dumbbell, House, Sparkles, Beer, Heart, VolumeOff, Hand, TriangleAlert, Snowflake } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const PACKAGE_OPTIONS = [
  { key: "familyFun", icon: House, inactiveColor: "from-blue-500/20 hover:from-blue-500/30", activeColor: "from-blue-500/40" },
  { key: "icebreaker", icon: Snowflake, inactiveColor: "from-cyan-500/20 hover:from-cyan-500/30", activeColor: "from-cyan-500/40" },
  { key: "athletic", icon: Dumbbell, inactiveColor: "from-green-500/20 hover:from-green-500/30", activeColor: "from-green-500/40" },
  { key: "quiet", icon: VolumeOff, inactiveColor: "from-indigo-500/20 hover:from-indigo-500/30", activeColor: "from-indigo-500/40" },
  { key: "noHands", icon: Hand, inactiveColor: "from-violet-500/20 hover:from-violet-500/30", activeColor: "from-violet-500/40" },
  { key: "couples", icon: Heart, inactiveColor: "from-pink-500/20 hover:from-pink-500/30", activeColor: "from-pink-500/40" },
  { key: "drinking", icon: Beer, inactiveColor: "from-amber-500/20 hover:from-amber-500/30", activeColor: "from-amber-500/40" },
  { key: "spicy", icon: Flame, inactiveColor: "from-red-500/20 hover:from-red-500/30", activeColor: "from-red-500/40" },
  { key: "extreme", icon: TriangleAlert, inactiveColor: "from-gray-600/20 hover:from-gray-600/30", activeColor: "from-gray-600/40" },
];

export default function PackageSelect({
  selectedPackages,
  setSelectedPackages,
  mixedPackagesEnabled,
  setMixedPackagesEnabled,
  onBack,
  onStartGame,
}) {
  const { t } = useI18n();

  const toggleMixedMode = () => {
    if (mixedPackagesEnabled) {
      // Switching back to radio mode keeps only one selection.
      setSelectedPackages([selectedPackages[0] ?? "familyFun"]);
      setMixedPackagesEnabled(false);
      return;
    }
    setMixedPackagesEnabled(true);
  };

  const togglePackage = (packKey) => {
    if (!mixedPackagesEnabled) {
      setSelectedPackages([packKey]);
      return;
    }

    if (selectedPackages.includes(packKey)) {
      if (selectedPackages.length === 1) {
        return;
      }
      setSelectedPackages(selectedPackages.filter((item) => item !== packKey));
      return;
    }

    if (selectedPackages.length >= 3) {
      return;
    }

    setSelectedPackages([...selectedPackages, packKey]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-full max-w-md mx-auto flex flex-col"
    >
      <div className="shrink-0 mb-6 pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("common.back")}
        </button>

        <div className="text-center mb-2">
          <h2 className="font-heading text-3xl font-bold text-foreground mb-2">{t("packageSelect.title")}</h2>
          <p className="font-body text-muted-foreground">{t("packageSelect.subtitle")}</p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pb-4 px-1 -mx-1">
        <div className="rounded-2xl border border-border bg-card p-4">
          <button
            type="button"
            onClick={toggleMixedMode}
            className={`w-full rounded-xl border px-3 py-3 mb-3 text-left transition-colors flex items-center justify-between ${
              mixedPackagesEnabled
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>
              <span className="font-body text-sm font-semibold block">{t("packageSelect.mixedToggleTitle")}</span>
              <span className="font-body text-xs text-muted-foreground">{t("packageSelect.mixedToggleHelp")}</span>
            </span>
            <span className="font-body text-xs">{mixedPackagesEnabled ? t("packageSelect.enabled") : t("packageSelect.disabled")}</span>
          </button>

          <p className="font-body text-sm text-muted-foreground mb-2">{t("packageSelect.listTitle")}</p>
          <p className="font-body text-xs text-muted-foreground mb-3">
            {mixedPackagesEnabled ? t("packageSelect.listHelpMixed") : t("packageSelect.listHelpSingle")}
          </p>

          <div className="space-y-2">
            {PACKAGE_OPTIONS.map((option) => {
              const Icon = option.icon;
              const active = selectedPackages.includes(option.key);
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => togglePackage(option.key)}
                  className={`w-full rounded-xl border px-3 py-3 text-left transition-colors flex items-center justify-between bg-gradient-to-l from-0% to-[70%] to-transparent ${
                    active
                      ? `border-primary text-foreground ${option.activeColor}`
                      : `border-border text-muted-foreground hover:text-foreground ${option.inactiveColor}`
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span className="font-body text-sm font-semibold">{t(`packages.${option.key}`)}</span>
                  </span>
                  <span className="font-body text-xs">
                    {mixedPackagesEnabled ? (active ? "✓" : "+") : (active ? "◉" : "○")}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="font-body text-xs text-muted-foreground mt-3">
            {t("packageSelect.mixLabel")} {selectedPackages.map((packKey) => t(`packages.${packKey}`)).join(", ")}
          </p>
        </div>
      </div>

      <div className="mt-auto shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-background via-background/95 to-transparent">
        <Button
          onClick={onStartGame}
          className="w-full h-16 rounded-2xl text-xl font-heading font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {t("packageSelect.startGame")}
        </Button>
      </div>
    </motion.div>
  );
}
