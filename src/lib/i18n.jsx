import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "app_language";

const translations = {
  en: {
    languageName: "English",
    common: {
      language: "Language",
      back: "Back",
      ready: "Ready",
      inProgress: "In progress...",
      timeUp: "Time's Up!",
      retry: "Retry",
      nextRound: "Next Round",
      pause: "Pause",
      resume: "Resume",
      start: "Start",
      goHome: "Go Home",
      minuteShort: "min",
      secondShort: "s",
      done: "Done!",
      revealWord: "Tap to reveal word",
      hiddenWord: "Hidden word:"
    },
    playerEntry: {
      subtitle: "Add your players and let the chaos begin",
      placeholder: "Enter player name...",
      noPlayers: "No players yet - add at least 2 to play!",
      nextPackages: "Next: Select Packages",
      addOneMore: "Add 1 more player to get started"
    },
    packageSelect: {
      title: "Select Packages",
      subtitle: "Pick one or more packages for this game",
      mixedToggleTitle: "Mixed packages",
      mixedToggleHelp: "Enable to combine multiple packages",
      enabled: "Enabled",
      disabled: "Disabled",
      listTitle: "All packages",
      listHelpSingle: "Select one package.",
      listHelpMixed: "Select up to 3 packages to mix.",
      mixLabel: "Mixing:",
      startGame: "Start Game"
    },
    packages: {
      familyFun: "Family Fun",
      spicy: "Spicy",
      athletic: "Athletic",
      drinking: "Drinking",
      couples: "Couples",
      quiet: "Quiet",
      icebreaker: "Icebreaker",
      noHands: "No Hands",
      extreme: "Extreme"
    },
    pairReveal: {
      title: "Game Time",
      challenge: "Team challenge:",
      packageLabel: "Package:",
      packageListTitle: "Packages",
      packageListHelp: "Select one or more packages to mix (up to 3).",
      mixLabel: "Mixing:",
      skip: "Skip",
      start: "Start!"
    },
    pageNotFound: {
      title: "Page Not Found",
      description: "The page \"{{page}}\" could not be found in this application."
    },
    userNotRegistered: {
      title: "Access Restricted",
      description:
        "You are not registered to use this application. Please contact the app administrator to request access.",
      ifError: "If you believe this is an error, you can:",
      tip1: "Verify you are logged in with the correct account",
      tip2: "Contact the app administrator for access",
      tip3: "Try logging out and back in again"
    },
    tasks: {
      handstandSplit: "Do a handstand and a split",
      stackItems: "Stack five different objects on top of each other",
      reverseAlphabet: "Say the alphabet backwards, taking turns",
      buildPaperTower: "Build one paper tower together using only one hand each",
      mirrorStretch: "Do a mirrored stretch routine together",
      silentLineup: "Line up by birthday month without speaking",
      jointStory: "Tell one story together, one sentence each",
      balanceBookWalk: "Walk three steps together with books balanced on your heads",
      clapPattern: "Create and repeat a clap pattern together",
      colorHunt: "Find five objects of different colors together",
      roomSketch: "Draw a quick sketch of the room together",
      oneBreathHum: "Hum one note together in one breath",
      shadowShapes: "Make three shadow shapes together on a wall",
      kindnessSprint: "Say three kind things about each other",
      teamOrigami: "Fold one origami shape together",
      rhythmWave: "Make a 10-second rhythm together",
      memoryTray: "Look at 6 objects for 10 seconds and recall them together",
      whisperRelay: "Pass a whisper phrase and repeat it correctly together",
      miniSong: "Make a 4-line mini song together",
      sockBasket: "Throw socks into a basket together",
      puzzleSprint: "Complete a small puzzle together",
      coinTrail: "Create a coin trail across the table together",
      statueSwitch: "Freeze as a statue and switch poses together",
      objectAlphabet: "Name objects together from A to F",
      gratitudeList: "Make a gratitude list of 5 items together",
      emojiCharadesTogether: "Act out three emojis together",
      cupPyramid: "Build and rebuild a cup pyramid together",
      backwardsCount: "Count backwards from 30 together",
      paperBridge: "Build a paper bridge that holds an eraser",
      spoonTransfer: "Transfer 10 small items with one spoon together",
      mirrorDrawing: "Draw the same shape at the same time together",
      teamPoem: "Write a 4-line poem together",
      deepBreaths: "Take 10 deep breaths in sync",
      towelFoldChallenge: "Fold a towel into a neat square together",
      blindBuild: "One guides while one builds a simple block shape",
      complimentEcho: "Give and repeat two compliments each",
      shapeWithBodies: "Form three letters with your bodies together",
      deskDrumBeat: "Play a desk drum beat in sync for 20 seconds",
      mapToSnack: "Draw a tiny treasure map to a snack together",
      towerOfCards: "Build a mini card tower together",
      scavengerThree: "Find three specific items together",
      miniYogaFlow: "Do a 3-pose yoga flow together",
      planPicnic: "Plan a dream picnic menu together",
      inventHandshake: "Invent a team handshake",
      speedCleanup: "Tidy one area together for 60 seconds",
      photoPoseSeries: "Create three fun photo poses together",
      backwardsSong: "Sing one short song line backwards together",
      alphabetCategories: "Pick a category and name words A-E together",
      penBalancePartner: "Balance a pen on two fingers together for 10 seconds",
      paperAirplaneFleet: "Make and launch two paper airplanes together",
      matchTempoSteps: "Match steps and tempo for 30 seconds",
      storyWithFiveWords: "Create one story using exactly five chosen words",
      silentMovieScene: "Act out a silent movie scene together",
      silentDescription: "Player 1 describes a word, without saying anything"
    }
  },
  nl: {
    languageName: "Nederlands",
    common: {
      language: "Taal",
      back: "Terug",
      ready: "Klaar",
      inProgress: "Bezig...",
      timeUp: "Tijd is op!",
      retry: "Opnieuw",
      nextRound: "Volgende ronde",
      pause: "Pauze",
      resume: "Hervat",
      start: "Start",
      goHome: "Naar home",
      minuteShort: "min",
      secondShort: "s",
      done: "Klaar!",
      revealWord: "Tik om woord te onthullen",
      hiddenWord: "Geheim woord:"
    },
    playerEntry: {
      subtitle: "Voeg spelers toe en laat de chaos beginnen",
      placeholder: "Voer een spelersnaam in...",
      noPlayers: "Nog geen spelers - voeg er minimaal 2 toe om te spelen!",
      nextPackages: "Volgende: Pakketten kiezen",
      addOneMore: "Voeg nog 1 speler toe om te starten"
    },
    packageSelect: {
      title: "Kies pakketten",
      subtitle: "Kies een of meerdere pakketten voor dit spel",
      mixedToggleTitle: "Gemixte pakketten",
      mixedToggleHelp: "Zet aan om meerdere pakketten te combineren",
      enabled: "Aan",
      disabled: "Uit",
      listTitle: "Alle pakketten",
      listHelpSingle: "Selecteer een pakket.",
      listHelpMixed: "Selecteer maximaal 3 pakketten om te mixen.",
      mixLabel: "Mix:",
      startGame: "Start spel"
    },
    packages: {
      familyFun: "Familiepret",
      spicy: "Spicy",
      athletic: "Atletisch",
      drinking: "Drinken",
      couples: "Koppels",
      quiet: "Stil",
      icebreaker: "Ijsbreker",
      noHands: "Geen handen",
      extreme: "Extreem"
    },
    pairReveal: {
      title: "Speltijd",
      challenge: "Teamopdracht:",
      packageLabel: "Pakket:",
      packageListTitle: "Pakketten",
      packageListHelp: "Selecteer een of meerdere pakketten om te mixen (max 3).",
      mixLabel: "Mix:",
      skip: "Skip",
      start: "Start!"
    },
    pageNotFound: {
      title: "Pagina niet gevonden",
      description: "De pagina \"{{page}}\" kon niet worden gevonden in deze applicatie."
    },
    userNotRegistered: {
      title: "Toegang beperkt",
      description:
        "Je bent niet geregistreerd om deze applicatie te gebruiken. Neem contact op met de beheerder om toegang aan te vragen.",
      ifError: "Als je denkt dat dit een fout is, kun je:",
      tip1: "Controleren of je bent ingelogd met het juiste account",
      tip2: "Contact opnemen met de appbeheerder voor toegang",
      tip3: "Uitloggen en opnieuw inloggen"
    },
    tasks: {
      handstandSplit: "Doe een handstand en een split",
      stackItems: "Stapel vijf verschillende voorwerpen op elkaar",
      reverseAlphabet: "Zeg het alfabet achterstevoren, om de beurt",
      buildPaperTower: "Bouw samen een papieren toren met elk maar een hand",
      mirrorStretch: "Doe samen een spiegel-stretch routine",
      silentLineup: "Ga op volgorde van geboortemaand staan zonder te praten",
      jointStory: "Vertel samen een verhaal, om de beurt een zin",
      balanceBookWalk: "Loop samen drie stappen met een boek op je hoofd",
      clapPattern: "Maak en herhaal samen een klappatroon",
      colorHunt: "Zoek samen vijf voorwerpen in verschillende kleuren",
      roomSketch: "Maak samen een snelle schets van de kamer",
      oneBreathHum: "Neurie samen een noot in een ademhaling",
      shadowShapes: "Maak samen drie schaduwfiguren op de muur",
      kindnessSprint: "Noem drie aardige dingen over elkaar",
      teamOrigami: "Vouw samen een origami figuur",
      rhythmWave: "Maak samen een ritme van 10 seconden",
      memoryTray: "Bekijk 6 objecten 10 seconden en onthoud ze samen",
      whisperRelay: "Geef een fluisterzin door en herhaal hem samen goed",
      miniSong: "Maak samen een mini liedje van 4 regels",
      sockBasket: "Gooi samen sokken in een mand",
      puzzleSprint: "Maak samen een kleine puzzel af",
      coinTrail: "Leg samen een spoor van munten over de tafel",
      statueSwitch: "Bevries als standbeeld en wissel samen van houding",
      objectAlphabet: "Noem samen voorwerpen van A tot F",
      gratitudeList: "Maak samen een dankbaarheidslijst met 5 punten",
      emojiCharadesTogether: "Beeld samen drie emojis uit",
      cupPyramid: "Bouw en herbouw samen een bekertjes-piramide",
      backwardsCount: "Tel samen terug vanaf 30",
      paperBridge: "Bouw samen een papieren brug die een gum draagt",
      spoonTransfer: "Verplaats samen 10 kleine voorwerpen met een lepel",
      mirrorDrawing: "Teken tegelijk samen dezelfde vorm",
      teamPoem: "Schrijf samen een gedicht van 4 regels",
      deepBreaths: "Haal samen 10 keer diep adem in hetzelfde ritme",
      towelFoldChallenge: "Vouw samen een handdoek tot een nette vierkant",
      blindBuild: "Een persoon stuurt, de ander bouwt een simpele blokvorm",
      complimentEcho: "Geef en herhaal allebei twee complimenten",
      shapeWithBodies: "Vorm samen drie letters met je lichaam",
      deskDrumBeat: "Trommel samen 20 seconden in hetzelfde ritme op tafel",
      mapToSnack: "Teken samen een mini schatkaart naar een snack",
      towerOfCards: "Bouw samen een kleine kaarten toren",
      scavengerThree: "Zoek samen drie specifieke voorwerpen",
      miniYogaFlow: "Doe samen een yoga flow van 3 houdingen",
      planPicnic: "Bedenk samen een droom picknick menu",
      inventHandshake: "Bedenk samen een team-handdruk",
      speedCleanup: "Ruim samen 60 seconden een plek op",
      photoPoseSeries: "Bedenk samen drie leuke foto-poses",
      backwardsSong: "Zing samen een korte songregel achterstevoren",
      alphabetCategories: "Kies een categorie en noem samen woorden van A-E",
      penBalancePartner: "Balanceer samen 10 seconden een pen op twee vingers",
      paperAirplaneFleet: "Maak en lanceer samen twee papieren vliegtuigen",
      matchTempoSteps: "Loop samen 30 seconden in exact hetzelfde tempo",
      storyWithFiveWords: "Maak samen een verhaal met precies vijf gekozen woorden",
      silentMovieScene: "Speel samen een stille film scene na",
      silentDescription: "Speler 1 beeldt een woord uit zonder iets te zeggen"
    }
  }
};

const I18nContext = createContext(null);

function getDefaultLanguage() {
  if (typeof window === "undefined") {
    return "en";
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "nl") {
    return stored;
  }
  return window.navigator.language?.toLowerCase().startsWith("nl") ? "nl" : "en";
}

function getByPath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

function interpolate(template, vars) {
  if (!vars) {
    return template;
  }
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? ""));
}

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(getDefaultLanguage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const value = useMemo(() => {
    const dict = translations[language] ?? translations.en;
    return {
      language,
      setLanguage,
      t: (key, vars) => {
        const valueAtKey = getByPath(dict, key);
        if (typeof valueAtKey !== "string") {
          return key;
        }
        return interpolate(valueAtKey, vars);
      }
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
