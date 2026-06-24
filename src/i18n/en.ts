import type { ToolContent } from './types';

// audio-silence-remover.

export const en: ToolContent = {
  htmlLang: 'en',

  meta: {
    title: 'Remove silence from audio — in your browser, no upload | runlocally',
    description:
      'Cut silent gaps out of an audio file directly in your browser. Drop an MP3, WAV or M4A, set the threshold and minimum gap, and get a trimmed MP3. Nothing is uploaded. Open source, works offline.',
    ogTitle: 'Remove silence from audio — in your browser, no upload',
    ogDescription:
      'Cut silent gaps from a recording and get a trimmed MP3, all in your browser. Nothing is uploaded. Open source, works offline.',
  },

  hero: {
    h1: 'Remove silence from audio',
    tagline:
      'Cut quiet gaps out of a recording and get a trimmed MP3 — in your browser. Nothing is uploaded.',
  },

  intro: {
    h2: 'Remove silence from audio, in your browser',
    paras: [
      'This tool finds the quiet stretches in an audio file and cuts them out, then gives you an MP3 of the trimmed result. Drop in an MP3, WAV, M4A or similar file — it is handy for tightening podcasts, voice memos, lecture and meeting recordings, and trimming dead air from the start, end and middle.',
      'Two controls decide what gets removed: a threshold for how quiet a section has to be to count as silence, and a minimum length for how long a gap must run before it is cut. A small pad is kept around each section that stays, so the joins don\'t click.',
      'Everything runs on your device. The browser\'s Web Audio decodes the file, and lamejs — pure JavaScript — re-encodes the kept audio to MP3. There is no WebAssembly and no server involved.',
    ],
  },

  privacy: {
    h2: 'Why your audio stays on your device',
    lead: 'Privacy here is structural, not a promise. There is no upload step because there is no server to upload to:',
    points: [
      'The whole process — decoding, detecting gaps, cutting and re-encoding — runs in your browser.',
      'The page is served as static files and makes no request carrying your audio.',
      'The source is open and anyone can read it (MIT).',
      'It works offline, which is only possible because nothing leaves the device.',
    ],
    note: 'If you want to check for yourself, open your browser\'s Network panel while it runs — no request carries your file.',
    sourceLinkText: 'Read the source.',
  },

  howto: {
    h2: 'How to use it',
    steps: [
      {
        h3: 'Drop an audio file',
        p: 'Click to choose a file, or drop one anywhere on the page. MP3, WAV, M4A and other common formats work.',
      },
      {
        h3: 'Set the threshold and minimum gap',
        p: 'Adjust how quiet counts as silence and how long a gap must be before it\'s cut. The defaults are a reasonable starting point; raise the threshold if quiet speech is being trimmed.',
      },
      {
        h3: 'Download the trimmed MP3',
        p: 'The tool re-encodes the kept audio to MP3 and hands you the new file. Your original is left untouched.',
      },
    ],
  },

  faqHeading: 'FAQ',
  faq: [
    {
      q: 'Is my audio uploaded anywhere?',
      a: 'No. Detecting the gaps, cutting them and re-encoding all run in your browser. There is no server component, so your file has no path off your device. The source is open and you can confirm this in your browser\'s Network panel.',
    },
    {
      q: 'What does the threshold control do?',
      a: 'The threshold sets how quiet a section has to be before it counts as silence. A lower threshold only cuts near-total silence; a higher one also trims faint room tone and breaths. If quiet speech is getting removed, lower the threshold.',
    },
    {
      q: 'What is the minimum silence length for?',
      a: 'It sets how long a quiet gap has to run before it is cut. This keeps natural short pauses between words intact while still removing the long dead-air stretches. Raise it to keep more pauses, lower it for tighter pacing.',
    },
    {
      q: 'What format do I get back?',
      a: 'An MP3. The kept audio is re-encoded to MP3 with lamejs, a pure-JavaScript encoder, so the result plays everywhere. The tool produces a new trimmed file and never changes your original.',
    },
    {
      q: 'Will the cuts sound abrupt or clicky?',
      a: 'A small pad is kept around each section that stays, so the audio is cut at quiet points rather than mid-sound. That keeps the joins from clicking and the result sounding smooth.',
    },
    {
      q: 'Does it work offline?',
      a: 'Yes. It is a PWA. After the first visit it is cached, so it keeps working without a network connection. You can also install it to your home screen.',
    },
    {
      q: 'Is there a file size or length limit?',
      a: 'There is no fixed limit. Because everything runs in your browser, the practical ceiling depends on your device\'s memory. Very long recordings may be slower or need more memory to process.',
    },
  ],

  footer: {
    openSourceLabel: 'Open source (MIT)',
    partOf: 'part of',
    brandTail: '— small tools that run locally on your device.',
    colophon:
      'Built and maintained by Geppetto. Some code is written with AI assistance; all review and decisions are the maintainer\'s.',
    securityText: 'Security',
  },
};
