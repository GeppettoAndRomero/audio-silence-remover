import type { ToolContent } from './types';

// Español.

export const es: ToolContent = {
  htmlLang: 'es',

  meta: {
    title: 'Quitar silencios de un audio — en tu navegador, sin subir nada | runlocally',
    description:
      'Recorta los tramos en silencio de un archivo de audio directamente en tu navegador. Suelta un MP3, WAV o M4A, ajusta el umbral y la duración mínima del hueco y obtén un MP3 recortado. No se sube nada. Código abierto, funciona sin conexión.',
    ogTitle: 'Quitar silencios de un audio — en tu navegador, sin subir nada',
    ogDescription:
      'Recorta los tramos en silencio de una grabación y obtén un MP3 recortado, todo en tu navegador. No se sube nada. Código abierto, funciona sin conexión.',
  },

  hero: {
    h1: 'Quitar silencios de un audio',
    tagline:
      'Recorta los tramos en silencio de una grabación y obtén un MP3 recortado — en tu navegador. No se sube nada.',
  },

  intro: {
    h2: 'Quitar silencios de un audio, en tu navegador',
    paras: [
      'Esta herramienta localiza los tramos en silencio de un archivo de audio y los recorta, y luego te entrega un MP3 con el resultado. Suelta un MP3, WAV, M4A o un archivo similar — viene bien para acortar podcasts, notas de voz, grabaciones de clases y reuniones, y para quitar los tiempos muertos del principio, del final y del medio.',
      'Dos controles deciden qué se quita: un umbral, que marca cuánto tiene que bajar el volumen de un fragmento para contar como silencio, y una duración mínima, que fija cuánto debe durar un hueco antes de recortarlo. Alrededor de cada fragmento que se conserva se deja un pequeño margen, para que las uniones no suenen con un chasquido.',
      'Todo se ejecuta en tu dispositivo. El Web Audio del navegador decodifica el archivo, y lamejs —JavaScript puro— recodifica a MP3 el audio que se conserva. No hay WebAssembly ni ningún servidor de por medio.',
    ],
  },

  privacy: {
    h2: 'Por qué tu audio no sale de tu dispositivo',
    lead: 'Aquí la privacidad es estructural, no una promesa. No hay paso de subida porque no hay ningún servidor al que subir nada:',
    points: [
      'Todo el proceso —decodificar, detectar los huecos, recortar y recodificar— se ejecuta en tu navegador.',
      'La página se sirve como archivos estáticos y no hace ninguna petición que lleve tu audio.',
      'El código es abierto y cualquiera puede leerlo (MIT).',
      'Funciona sin conexión, algo que solo es posible porque nada sale del dispositivo.',
    ],
    note: 'Si quieres comprobarlo por tu cuenta, abre el panel de Red de tu navegador mientras se ejecuta — ninguna petición lleva tu archivo.',
    sourceLinkText: 'Lee el código.',
  },

  howto: {
    h2: 'Cómo usarla',
    steps: [
      {
        h3: 'Suelta un archivo de audio',
        p: 'Haz clic para elegir un archivo, o suéltalo en cualquier parte de la página. Funcionan MP3, WAV, M4A y otros formatos habituales.',
      },
      {
        h3: 'Ajusta el umbral y la duración mínima del hueco',
        p: 'Regula cuánto tiene que bajar el volumen para contar como silencio y cuánto debe durar un hueco antes de recortarlo. Los valores por defecto son un buen punto de partida; sube el umbral si se está recortando voz en bajo volumen.',
      },
      {
        h3: 'Descarga el MP3 recortado',
        p: 'La herramienta recodifica a MP3 el audio que se conserva y te entrega el archivo nuevo. Tu original queda intacto.',
      },
    ],
  },

  faqHeading: 'Preguntas frecuentes',
  faq: [
    {
      q: '¿Se sube mi audio a algún sitio?',
      a: 'No. Detectar los huecos, recortarlos y recodificar se ejecutan en tu navegador. No hay ningún componente de servidor, así que tu archivo no tiene ninguna vía para salir de tu dispositivo. El código es abierto y puedes confirmarlo en el panel de Red de tu navegador.',
    },
    {
      q: '¿Qué hace el control de umbral?',
      a: 'El umbral fija cuánto tiene que bajar el volumen de un fragmento antes de contar como silencio. Un umbral más bajo solo recorta el silencio casi total; uno más alto también quita el ruido de fondo tenue y las respiraciones. Si se está quitando voz en bajo volumen, baja el umbral.',
    },
    {
      q: '¿Para qué sirve la duración mínima del silencio?',
      a: 'Fija cuánto debe durar un hueco en silencio antes de recortarlo. Así se mantienen intactas las pausas cortas y naturales entre palabras, sin dejar de quitar los tramos largos de tiempo muerto. Súbela para conservar más pausas, bájala para un ritmo más ceñido.',
    },
    {
      q: '¿En qué formato lo recibo?',
      a: 'En MP3. El audio que se conserva se recodifica a MP3 con lamejs, un codificador en JavaScript puro, de modo que el resultado se reproduce en todas partes. La herramienta genera un archivo recortado nuevo y nunca cambia tu original.',
    },
    {
      q: '¿Los cortes sonarán bruscos o con chasquidos?',
      a: 'Alrededor de cada fragmento que se conserva se deja un pequeño margen, de modo que el audio se corta en puntos en silencio y no a media palabra. Eso evita que las uniones suenen con un chasquido y mantiene un resultado limpio.',
    },
    {
      q: '¿Funciona sin conexión?',
      a: 'Sí. Es una PWA. Tras la primera visita queda guardada en la caché, así que sigue funcionando sin conexión a la red. También puedes instalarla en tu pantalla de inicio.',
    },
    {
      q: '¿Hay un límite de tamaño o de duración?',
      a: 'No hay un límite fijo. Como todo se ejecuta en tu navegador, el tope práctico depende de la memoria de tu dispositivo. Las grabaciones muy largas pueden ir más lentas o necesitar más memoria para procesarse.',
    },
  ],

  footer: {
    openSourceLabel: 'Código abierto (MIT)',
    partOf: 'parte de',
    brandTail: '— herramientas pequeñas que funcionan de forma local en tu dispositivo.',
    colophon:
      'Creada y mantenida por Geppetto. Parte del código se escribe con ayuda de IA; toda la revisión y las decisiones son del responsable del proyecto.',
    securityText: 'Seguridad',
  },
};
