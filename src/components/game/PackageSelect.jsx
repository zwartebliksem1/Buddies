import { Button } from "@/components/ui/button";
import { ArrowLeft, Flame, Dumbbell, House, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const PACKAGE_OPTIONS = [
  { key: "familyFun", icon: House },
  { key: "spicy", icon: Flame },
  { key: "athletic", icon: Dumbbell },
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
      className="w-full max-w-md mx-auto"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-body mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("common.back")}
      </button>

      <div className="text-center mb-8">
        <h2 className="font-heading text-3xl font-bold text-foreground mb-2">{t("packageSelect.title")}</h2>
        <p className="font-body text-muted-foreground">{t("packageSelect.subtitle")}</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 mb-6">
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
                className={`w-full rounded-xl border px-3 py-3 text-left transition-colors flex items-center justify-between ${
                  active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
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

      <Button
        onClick={onStartGame}
        className="w-full h-16 rounded-2xl text-xl font-heading font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        {t("packageSelect.startGame")}
      </Button>
    </motion.div>
  );
}
