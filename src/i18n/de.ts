import type { ToolContent } from './types';

// Deutsch.

export const de: ToolContent = {
  htmlLang: 'de',

  meta: {
    title: 'Stille aus Audio entfernen — im Browser, ohne Upload | runlocally',
    description:
      'Schneide stille Stellen aus einer Audiodatei direkt im Browser heraus. Lege eine MP3, WAV oder M4A ab, stelle Schwellenwert und Mindestlänge der Pausen ein und erhalte eine gekürzte MP3. Nichts wird hochgeladen. Open Source, funktioniert offline.',
    ogTitle: 'Stille aus Audio entfernen — im Browser, ohne Upload',
    ogDescription:
      'Schneide stille Stellen aus einer Aufnahme heraus und erhalte eine gekürzte MP3, alles im Browser. Nichts wird hochgeladen. Open Source, funktioniert offline.',
  },

  hero: {
    h1: 'Stille aus Audio entfernen',
    tagline:
      'Schneide stille Stellen aus einer Aufnahme heraus und erhalte eine gekürzte MP3 — im Browser. Nichts wird hochgeladen.',
  },

  intro: {
    h2: 'Stille aus Audio entfernen, im Browser',
    paras: [
      'Dieses Tool findet die ruhigen Passagen in einer Audiodatei und schneidet sie heraus, dann bekommst du eine MP3 vom gekürzten Ergebnis. Lege eine MP3, WAV, M4A oder ähnliche Datei ab — praktisch, um Podcasts, Sprachmemos sowie Vorlesungs- und Meeting-Aufnahmen zu straffen und Leerlauf am Anfang, am Ende und zwischendrin wegzuschneiden.',
      'Zwei Regler entscheiden, was entfernt wird: ein Schwellenwert dafür, wie leise eine Stelle sein muss, um als Stille zu gelten, und eine Mindestlänge dafür, wie lange eine Pause laufen muss, bevor sie geschnitten wird. Um jede Stelle, die bleibt, wird ein kleiner Puffer behalten, damit die Übergänge nicht knacken.',
      'Alles läuft auf deinem Gerät. Web Audio im Browser dekodiert die Datei, und lamejs — reines JavaScript — kodiert das behaltene Audio wieder zu MP3. Es ist kein WebAssembly und kein Server beteiligt.',
    ],
  },

  privacy: {
    h2: 'Warum dein Audio auf deinem Gerät bleibt',
    lead: 'Datenschutz ist hier strukturell, kein bloßes Versprechen. Es gibt keinen Upload-Schritt, weil es keinen Server gibt, zu dem hochgeladen werden könnte:',
    points: [
      'Der ganze Ablauf — Dekodieren, Pausen erkennen, Schneiden und neu Kodieren — läuft in deinem Browser.',
      'Die Seite wird als statische Dateien ausgeliefert und stellt keine Anfrage, die dein Audio mitschickt.',
      'Der Quellcode ist offen und jeder kann ihn lesen (MIT).',
      'Es funktioniert offline, was nur möglich ist, weil nichts das Gerät verlässt.',
    ],
    note: 'Wenn du es selbst prüfen willst, öffne während des Laufs den Netzwerk-Tab deines Browsers — keine Anfrage trägt deine Datei.',
    sourceLinkText: 'Lies den Quellcode.',
  },

  howto: {
    h2: 'So nutzt du es',
    steps: [
      {
        h3: 'Audiodatei ablegen',
        p: 'Klicke, um eine Datei auszuwählen, oder lege eine irgendwo auf der Seite ab. MP3, WAV, M4A und andere gängige Formate funktionieren.',
      },
      {
        h3: 'Schwellenwert und Mindestlänge einstellen',
        p: 'Stelle ein, wie leise als Stille zählt und wie lange eine Pause sein muss, bevor sie geschnitten wird. Die Vorgaben sind ein brauchbarer Ausgangspunkt; erhöhe den Schwellenwert, wenn leise Sprache weggeschnitten wird.',
      },
      {
        h3: 'Gekürzte MP3 herunterladen',
        p: 'Das Tool kodiert das behaltene Audio zu MP3 und gibt dir die neue Datei. Dein Original bleibt unangetastet.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Wird mein Audio irgendwohin hochgeladen?',
      a: 'Nein. Die Pausen erkennen, sie schneiden und neu kodieren — das läuft alles in deinem Browser. Es gibt keine Server-Komponente, also hat deine Datei keinen Weg von deinem Gerät weg. Der Quellcode ist offen, und du kannst das im Netzwerk-Tab deines Browsers bestätigen.',
    },
    {
      q: 'Was macht der Schwellenwert-Regler?',
      a: 'Der Schwellenwert legt fest, wie leise eine Stelle sein muss, bevor sie als Stille zählt. Ein niedriger Schwellenwert schneidet nur nahezu völlige Stille; ein höherer trimmt auch leises Raumrauschen und Atmer. Wenn leise Sprache entfernt wird, senke den Schwellenwert.',
    },
    {
      q: 'Wofür ist die Mindestlänge der Stille?',
      a: 'Sie legt fest, wie lange eine ruhige Pause laufen muss, bevor sie geschnitten wird. So bleiben natürliche kurze Pausen zwischen Wörtern erhalten, während die langen Leerlaufstrecken trotzdem entfernt werden. Erhöhe sie, um mehr Pausen zu behalten, senke sie für ein strafferes Tempo.',
    },
    {
      q: 'Welches Format bekomme ich zurück?',
      a: 'Eine MP3. Das behaltene Audio wird mit lamejs neu zu MP3 kodiert, einem Encoder aus reinem JavaScript, sodass das Ergebnis überall abspielbar ist. Das Tool erzeugt eine neue, gekürzte Datei und verändert nie dein Original.',
    },
    {
      q: 'Klingen die Schnitte abrupt oder klicken sie?',
      a: 'Um jede Stelle, die bleibt, wird ein kleiner Puffer behalten, sodass das Audio an ruhigen Punkten geschnitten wird statt mitten im Klang. Das hält die Übergänge frei von Knackgeräuschen, und das Ergebnis klingt sauber.',
    },
    {
      q: 'Funktioniert es offline?',
      a: 'Ja. Es ist eine PWA. Nach dem ersten Besuch ist es im Cache, also läuft es ohne Netzverbindung weiter. Du kannst es auch zum Startbildschirm hinzufügen.',
    },
    {
      q: 'Gibt es eine Grenze für Dateigröße oder Länge?',
      a: 'Es gibt keine feste Grenze. Weil alles in deinem Browser läuft, hängt die praktische Obergrenze vom Arbeitsspeicher deines Geräts ab. Sehr lange Aufnahmen können langsamer sein oder mehr Speicher zur Verarbeitung brauchen.',
    },
  ],

  footer: {
    openSourceLabel: 'Open Source (MIT)',
    partOf: 'Teil von',
    brandTail: '— kleine Tools, die lokal auf deinem Gerät laufen.',
    colophon:
      'Gebaut und gepflegt von Geppetto. Ein Teil des Codes entsteht mit KI-Unterstützung; alle Prüfung und Entscheidungen liegen beim Maintainer.',
    securityText: 'Sicherheit',
  },
};
