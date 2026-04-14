import { useI18n } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card/90 backdrop-blur px-1 py-1 shadow">
        <span className="sr-only">{t("common.language")}</span>
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            language === "en"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={language === "en"}
          aria-label="Switch to English"
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLanguage("nl")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            language === "nl"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={language === "nl"}
          aria-label="Schakel naar Nederlands"
        >
          NL
        </button>
      </div>
    </div>
  );
}
