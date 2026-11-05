// ─────────────────────────────────────────────────────────────
//  CONTENUTI DEL SITO — qui modifichi tutti i testi (IT / EN).
//  I valori tra [parentesi quadre] sono segnaposto da completare.
// ─────────────────────────────────────────────────────────────

// Per usare la tua foto vera: metti il file in /public (es. me.jpg) e scrivi '/me.jpg'
export const PHOTO = `${import.meta.env.BASE_URL}portrait.webp`

// piccolo helper: sceglie la lingua da un oggetto {it, en}
export const tr = (v, lang) => (v && typeof v === 'object' && 'it' in v ? v[lang] : v)

export const ui = {
  it: {
    name: 'Francesco Milione',
    role: 'Sviluppatore · Pilota di droni',
    hint: 'Clicca sullo scaffale',
    back: '← Torna allo scaffale',
    prev: '← Precedente',
    next: 'Successivo →',
    index: 'Indice',
    purr: 'mrrr…',
    open: 'Apri',
    soon: 'in arrivo',
    home: 'Home',
    dragHint: 'Trascina per sfogliare',
    tapApp: 'Tocca un’app',
    openProject: 'Apri un progetto',
    tapWatch: 'Tocca lo schermo',
    openLink: 'Apri',
  },
  en: {
    name: 'Francesco Milione',
    role: 'Developer · Drone pilot',
    hint: 'Click the shelf',
    back: '← Back to shelf',
    prev: '← Previous',
    next: 'Next →',
    index: 'Index',
    purr: 'purr…',
    open: 'Open',
    soon: 'coming soon',
    home: 'Home',
    dragHint: 'Drag to flip',
    tapApp: 'Tap an app',
    openProject: 'Open a project',
    tapWatch: 'Tap the screen',
    openLink: 'Open',
  },
}

// nome degli oggetti (didascalia al passaggio del mouse + indice)
export const labels = {
  about: { it: 'Chi sono', en: 'About me' },
  edu: { it: 'Formazione', en: 'Education' },
  mobile: { it: 'App mobile', en: 'Mobile apps' },
  web: { it: 'App web', en: 'Web apps' },
  watch: { it: 'Apple Watch', en: 'Apple Watch' },
  drone: { it: 'Voli', en: 'Flights' },
  contact: { it: 'Contatti', en: 'Contact' },
  skills: { it: 'Competenze', en: 'Skills' },
  cat: { it: 'Shh, dorme', en: 'Shh, sleeping' },
  lamp: { it: 'Lampada', en: 'Lamp' },
  lampOn: { it: 'Accendi la luce', en: 'Turn on the light' },
  lampOff: { it: 'Spegni la luce', en: 'Turn off the light' },
  insta: { it: 'Instagram', en: 'Instagram' },
  mug: { it: 'Caffè', en: 'Coffee' },
  lampBroken: { it: 'Lampadina fulminata…', en: 'Bulb blown…' },
}

// ── CHI SONO ────────────────────────────────────────────────
export const about = {
  title: { it: 'Chi sono', en: 'About me' },
  lead: {
    it: 'Sono Francesco, sviluppatore. Costruisco app per iPhone e Apple Watch, strumenti web e, quando il tempo lo permette, vado a volare con il drone.',
    en: "I'm Francesco, a developer. I build iPhone and Apple Watch apps, web tools and, when time allows, I go flying with my drone.",
  },
  body: [
    {
      it: 'Lavoro in Avvale sui progetti del cliente Generali. Fuori dal lavoro ho pubblicato Timer Lift su App Store e sviluppo piccoli strumenti su misura, per amici e per il negozio di famiglia.',
      en: 'I work at Avvale on projects for the client Generali. Outside work I published Timer Lift on the App Store and build small custom tools for friends and for the family shop.',
    },
    {
      it: 'Ho studiato Ingegneria Informatica a Bologna, con un debole per intelligenza artificiale, computer vision e computer graphics. Mi piace costruire cose che si usano davvero: quasi tutto nasce da un problema reale, in palestra, in negozio o per un amico.',
      en: 'I studied Computer Engineering in Bologna, with a soft spot for artificial intelligence, computer vision and computer graphics. I like building things people actually use: almost everything starts from a real problem, in the gym, in the shop or for a friend.',
    },
  ],
  frames: [
    null,
    {
      eyebrow: { it: 'Lavoro', en: 'Work' },
      title: 'Avvale',
      text: { it: 'Sviluppatore in Avvale, sui progetti del cliente Generali.', en: 'Developer at Avvale, on the client Generali projects.' },
    },
    {
      eyebrow: { it: 'Passioni', en: 'Interests' },
      title: { it: 'Fuori dal codice', en: 'Beyond code' },
      text: { it: 'Volo con il drone (patentino EASA A1/A3), faccio il tecnico audio e luci per una compagnia teatrale amatoriale, faccio l’animatore all’oratorio e mi alleno in palestra.', en: 'I fly drones (EASA A1/A3 licence), run sound and lights for an amateur theatre company, volunteer as a youth-group leader and train at the gym.' },
    },
  ],
  hobbies: [
    { it: 'Drone FPV', en: 'FPV drone' },
    { it: 'Teatro: audio e luci', en: 'Theatre: sound & lights' },
    { it: 'Animatore all’oratorio', en: 'Youth-group leader' },
    { it: 'Palestra', en: 'Gym' },
  ],
}

// ── FORMAZIONE ──────────────────────────────────────────────
// in ordine cronologico: il pannello si apre sull'ultima voce (la laurea magistrale)
export const edu = {
  title: { it: 'Formazione', en: 'Education' },
  items: [
    {
      id: 'olimpiadi',
      tl: { year: '', name: { it: 'Olimpiadi', en: 'Olympiad' } },
      head: 'MINISTERO DELL’ISTRUZIONE',
      lines: ['OLIMPIADI DI', 'INFORMATICA'],
      diploma: { it: 'ATTESTATO', en: 'CERTIFICATE' },
      course: { it: '2° posto regionale', en: '2nd place, regional' },
      year: { it: 'Basilicata', en: 'Basilicata' },
      thesis: { it: 'Olimpiadi a squadre: finalista regionale', en: 'Team olympiad: regional finalist' },
      level: 2,
    },
    {
      id: 'diploma',
      tl: { year: '2019', name: { it: 'Diploma', en: 'Diploma' } },
      head: 'ISTITUTO TECNICO · LAURIA',
      lines: ['ITIS ENZO', 'FERRARI'],
      diploma: { it: 'DIPLOMA', en: 'HIGH SCHOOL DIPLOMA' },
      course: { it: 'Indirizzo Informatica (TIC)', en: 'Computer science (ICT)' },
      year: '2014 – 2019 · 100/100',
      thesis: { it: 'Lauria (PZ)', en: 'Lauria (PZ)' },
      level: 1,
    },
    {
      id: 'inglese',
      tl: { year: '', name: { it: 'Inglese B2', en: 'English B2' } },
      head: 'QCER · QUADRO EUROPEO',
      lines: ['INGLESE', 'LIVELLO B2'],
      diploma: { it: 'LINGUA', en: 'LANGUAGE' },
      course: { it: 'Livello intermedio', en: 'Upper intermediate' },
      year: { it: 'B2 in tutte le competenze', en: 'B2 in every skill' },
      thesis: { it: 'Ascolto · Lettura · Parlato · Scrittura', en: 'Listening · Reading · Speaking · Writing' },
      level: 1,
    },
    {
      id: 'triennale',
      tl: { year: '2022', name: { it: 'Triennale', en: 'Bachelor' } },
      diploma: { it: 'LAUREA TRIENNALE', en: 'BACHELOR’S DEGREE' },
      course: { it: 'Ingegneria Informatica', en: 'Computer Engineering' },
      level: 1,
      year: '2019 – 2022 · 99/110',
      thesis: {
        it: 'Tesi: Progetto di un’architettura serverless integrata nei dispositivi IoT',
        en: 'Thesis: Design of a serverless architecture integrated in IoT devices',
      },
    },
    {
      id: 'magistrale',
      tl: { year: '2025', name: { it: 'Magistrale', en: 'Master' } },
      diploma: { it: 'LAUREA MAGISTRALE', en: 'MASTER’S DEGREE' },
      course: { it: 'Ingegneria Informatica', en: 'Computer Engineering' },
      level: 2,
      year: '2022 – 07.10.2025 · 100/110',
      thesis: {
        it: 'Tesi: Migrazione di applicazioni in ambienti 5G federati Multi-access Edge Computing (MEC)',
        en: 'Thesis: Application migration in federated 5G Multi-access Edge Computing (MEC) environments',
      },
    },
  ],
}

// ── APPLE WATCH: schermate che scorri toccando ──────────────
export const watchPages = [
  { title: { it: 'Recupero al polso', en: 'Rest on your wrist' }, text: { it: 'Avvii il timer di recupero senza prendere il telefono.', en: 'Start the rest timer without picking up your phone.' } },
  { title: { it: 'Sempre sincronizzata', en: 'Always in sync' }, text: { it: 'I dati dell’allenamento viaggiano tra Watch e iPhone con HealthKit.', en: 'Workout data travels between Watch and iPhone with HealthKit.' } },
  { title: { it: 'Su App Store', en: 'On the App Store' }, text: { it: 'Un’unica app, per iPhone e Apple Watch.', en: 'One app, for iPhone and Apple Watch.' }, tags: ['SwiftUI', 'watchOS', 'HealthKit'] },
]

// ── PROGETTI (iPhone, monitor, watch) ───────────────────────
export const projects = {
  mobile: {
    title: { it: 'App mobile', en: 'Mobile apps' },
    lead: { it: 'App native per iPhone e Apple Watch.', en: 'Native apps for iPhone and Apple Watch.' },
    items: [
      {
        icon: 'timer',
        name: 'Timer Lift',
        kind: 'iOS · watchOS',
        text: {
          it: 'Timer di recupero per l’allenamento in palestra, con integrazione Apple Watch. Pubblicata su App Store.',
          en: 'Rest timer for gym workouts, with Apple Watch integration. Published on the App Store.',
        },
        bullets: [
          { it: 'Calendario mensile con selezione dei giorni a scorrimento', en: 'Monthly calendar with scroll-based day selection' },
          { it: 'Dettaglio allenamento con grafici: frequenza cardiaca, zone, esercizi', en: 'Workout detail with charts: heart rate, zones, exercises' },
          { it: 'Medaglia 3D che reagisce al giroscopio', en: '3D medal reacting to the gyroscope' },
          { it: 'Stima delle calorie con valori MET dinamici', en: 'Calorie estimation with dynamic MET values' },
        ],
        tags: ['SwiftUI', 'HealthKit', 'Swift Charts', 'SceneKit', 'Lottie', 'iCloud'],
        link: null, // es. 'https://apps.apple.com/...'
      },
      {
        icon: 'pulse',
        name: 'PolarMulti',
        kind: 'iOS · Android',
        text: {
          it: 'Monitora più fasce cardio Polar contemporaneamente durante una sessione in palestra. Versione Android (Java) in lavorazione.',
          en: 'Monitors several Polar heart-rate straps at once during a gym session. Android (Java) version in progress.',
        },
        bullets: [],
        tags: ['Swift', 'Bluetooth LE', 'Java'],
        link: null,
      },
    ],
  },
  watch: {
    title: { it: 'Apple Watch', en: 'Apple Watch' },
    lead: {
      it: 'Il recupero tra una serie e l’altra, direttamente al polso.',
      en: 'The rest between sets, right on your wrist.',
    },
    items: [
      {
        icon: 'timer',
        name: 'Timer Lift · watchOS',
        kind: 'watchOS',
        text: {
          it: 'La companion app di Timer Lift: avvii e controlli il timer di recupero senza prendere il telefono, con i dati dell’allenamento sincronizzati tramite HealthKit.',
          en: 'The Timer Lift companion app: start and control the rest timer without touching your phone, with workout data synced through HealthKit.',
        },
        bullets: [],
        tags: ['SwiftUI', 'watchOS', 'HealthKit'],
        link: null,
      },
    ],
  },
  web: {
    title: { it: 'App web', en: 'Web apps' },
    lead: { it: 'Strumenti pensati per un’esigenza reale, spesso su richiesta.', en: 'Tools built for a real need, often on request.' },
    items: [
      {
        icon: 'coin',
        name: 'Registro incassi',
        kind: 'Web app',
        text: {
          it: 'Per segnare in fretta gli incassi dei clienti in negozio: importo e invio, lista della giornata, riepiloghi giornalieri, mensili e annuali. In uso ogni giorno.',
          en: 'To quickly log customer payments in a shop: amount and enter, daily list, daily, monthly and yearly summaries. Used every day.',
        },
        bullets: [
          { it: 'Importo e invio, anche con carta', en: 'Amount and enter, also by card' },
          { it: 'Lista della giornata con l’orario', en: 'Day list with timestamps' },
          { it: 'Riepiloghi giornalieri, mensili e annuali', en: 'Daily, monthly and yearly summaries' },
          { it: 'Un file indipendente: i dati restano sul tuo PC', en: 'A standalone file: your data stays on your PC' },
        ],
        tags: ['JavaScript', 'Node.js'],
        link: null,
      },
      {
        icon: 'key',
        name: 'Trova Chiave',
        kind: 'Web app · mobile-first',
        text: {
          it: 'Dalla foto di una chiave trova il grezzo Silca giusto, usando un foglio stampato come riferimento di scala.',
          en: 'From a photo of a key, finds the right Silca blank, using a printed sheet as a scale reference.',
        },
        bullets: [
          { it: 'Foto della chiave sopra un foglio stampato di riferimento', en: 'Photo of the key on a printed reference sheet' },
          { it: 'Usa il catalogo Silca 110', en: 'Uses the Silca 110 catalogue' },
          { it: 'Pensata per l’uso da telefono', en: 'Built for phone use' },
        ],
        tags: ['Web app', 'Catalogo Silca'],
        link: null,
      },
      {
        icon: 'trophy',
        name: 'Fanta Oratorio',
        kind: 'React · GitHub Pages',
        text: {
          it: 'Un fantagioco per il centro estivo dell’oratorio.',
          en: 'A fantasy game for the oratory summer camp.',
        },
        bullets: [
          { it: 'Squadre, punteggi e classifica', en: 'Teams, scores and leaderboard' },
          { it: 'Online su GitHub Pages', en: 'Online on GitHub Pages' },
        ],
        tags: ['React', 'GitHub Pages'],
        link: null,
      },
      {
        icon: 'body',
        name: { it: 'Gestionale per kinesiologo', en: 'Kinesiologist practice app' },
        kind: 'React · Supabase',
        text: {
          it: 'Per un amico kinesiologo: schede dei pazienti, composizione corporea e programmi di esercizi.',
          en: 'For a kinesiologist friend: patient files, body composition and exercise programs.',
        },
        bullets: [
          { it: 'Schede dei pazienti', en: 'Patient files' },
          { it: 'Composizione corporea', en: 'Body composition' },
          { it: 'Programmi di esercizi', en: 'Exercise programs' },
          { it: 'Pensato per la privacy dei dati (GDPR)', en: 'Designed with data privacy in mind (GDPR)' },
        ],
        tags: ['React', 'Vite', 'Material UI', 'Supabase'],
        link: null,
      },
      {
        icon: 'shop',
        name: 'Ferramenta Milione',
        kind: 'Sito web',
        text: { it: 'Il sito del negozio di famiglia.', en: 'The website of the family shop.' },
        bullets: [
          { it: 'Il sito del negozio di famiglia', en: 'The family shop’s website' },
          { it: 'Online su ferramentamilione.it', en: 'Online at ferramentamilione.it' },
        ],
        tags: [],
        link: 'https://ferramentamilione.it',
      },
    ],
  },
}

// ── LIBRI = COMPETENZE ──────────────────────────────────────
export const books = [
  {
    id: 'dev',
    pattern: 'circle',
    title: { it: 'Mobile & Web', en: 'Mobile & Web' },
    sub: { it: 'iOS · watchOS · Android · Web', en: 'iOS · watchOS · Android · Web' },
    text: {
      it: 'App native per iPhone e Apple Watch curate nei dettagli, e web app veloci e pulite, dal prototipo alla messa online.',
      en: 'Native iPhone and Apple Watch apps polished in the details, and fast, clean web apps, from prototype to launch.',
    },
    groups: [
      { g: 'Apple', items: ['Swift', 'SwiftUI', 'watchOS', 'HealthKit', 'Swift Charts', 'SceneKit', 'Lottie', 'iCloud'] },
      { g: 'Android', items: ['Java'] },
      { g: 'Front-end', items: ['React', 'Vite', 'Tailwind CSS', 'Material UI', 'Framer Motion'] },
      { g: 'Back-end & deploy', items: ['Node.js', 'Java Servlet', 'EJB', 'PHP', 'Supabase', 'GitHub Pages', 'PWA'] },
      { g: { it: 'Linguaggi', en: 'Languages' }, items: ['JavaScript', 'HTML', 'CSS', 'Java', 'C', 'C++', 'C#'] },
    ],
  },
  {
    id: '3d',
    pattern: 'stripes',
    title: { it: '3D & Video', en: '3D & Video' },
    sub: { it: 'Modelli, riprese, montaggio', en: 'Models, footage, editing' },
    text: {
      it: 'Dalla modellazione di ambienti alle riprese con il drone, fino al montaggio.',
      en: 'From modelling environments to drone footage, all the way to editing.',
    },
    groups: [
      { g: '3D', items: ['Blender', 'SceneKit', { it: 'Seminario CINECA', en: 'CINECA workshop' }] },
      { g: { it: 'Teatro', en: 'Theatre' }, items: [{ it: 'Animazioni per gli spettacoli', en: 'Animations for the shows' }, { it: 'Audio 3D', en: '3D audio' }, { it: 'Luci', en: 'Lights' }] },
      { g: 'Video', items: ['DJI Avata 2 (FPV)', 'DaVinci Resolve', 'Lottie'] },
    ],
  },
  {
    id: 'work',
    pattern: 'dots',
    title: { it: 'Lavoro', en: 'Work' },
    sub: { it: 'Avvale · cliente Generali', en: 'Avvale · client Generali' },
    text: {
      it: 'Sviluppatore in Avvale, sui progetti del cliente Generali.',
      en: 'Developer at Avvale, on the client Generali projects.',
    },
    groups: [{ g: 'Stack', items: ['React'] }],
  },
]

// ── VOLI ────────────────────────────────────────────────────
export const drone = {
  title: { it: 'Voli', en: 'Flights' },
  lead: {
    it: 'Volo in FPV con un DJI Avata 2, monto con DaVinci Resolve e pubblico i video come Reel su Instagram.',
    en: 'I fly FPV with a DJI Avata 2, edit in DaVinci Resolve and post the videos as Instagram Reels.',
  },
  videos: [
    { src: `${import.meta.env.BASE_URL}videos/v1.mp4`, poster: `${import.meta.env.BASE_URL}videos/v1.jpg`, wide: true, label: { it: 'Volo 01', en: 'Flight 01' } },
    { src: `${import.meta.env.BASE_URL}videos/v2.mp4`, poster: `${import.meta.env.BASE_URL}videos/v2.jpg`, label: { it: 'Volo 02', en: 'Flight 02' } },
    { src: `${import.meta.env.BASE_URL}videos/v3.mp4`, poster: `${import.meta.env.BASE_URL}videos/v3.jpg`, label: { it: 'Volo 03', en: 'Flight 03' } },
    { src: `${import.meta.env.BASE_URL}videos/v4.mp4`, poster: `${import.meta.env.BASE_URL}videos/v4.jpg`, label: { it: 'Volo 04', en: 'Flight 04' } },
  ],
  link: { label: 'Instagram', href: 'https://instagram.com/francescomilione_' },
}

// ── CONTATTI ────────────────────────────────────────────────
export const contact = {
  title: { it: 'Contatti', en: 'Contact' },
  lead: { it: 'Alza la cornetta: scrivimi.', en: 'Pick up the phone: write to me.' },
  rows: [
    { label: 'Email', value: 'francesco.milione2000@gmail.com', href: 'mailto:francesco.milione2000@gmail.com' },
    { label: 'Instagram', value: '@francescomilione_', href: 'https://instagram.com/francescomilione_' },
    { label: 'LinkedIn', value: 'francesco-milione', href: 'https://www.linkedin.com/in/francesco-milione-3705381b7/' },
    { label: 'GitHub', value: 'francesco-milione', href: 'https://github.com/francesco-milione' },
  ],
}
