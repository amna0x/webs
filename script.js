/* ============================================
   amna_OS — interactive desktop runtime
   ============================================ */
'use strict';

// --------------------------------------------
// Project / file system data (vault)
// --------------------------------------------
const PROJECTS = [
  {
    id: 'sideline',
    name: 'sideline-copilot',
    title: 'Sideline Copilot CLI — Real-time Bundesliga Companion',
    desc: 'Mobile-first PWA second-screen companion during live Bundesliga matches. Live predictions, leaderboards, collectible drops, vault of digital trading cards in real time.',
    stack: ['React 18', 'Vite', 'Tailwind', 'Zustand', 'Socket.io', 'Framer Motion', 'Supabase Auth', 'Node + Express'],
    features: [
      'Live match events (goals, cards, substitutions)',
      'Prediction engine with reward system',
      'Real-time leaderboard via socket events',
      'Vault system with collectible canvas-rendered cards',
      'User profiles with customization',
      'JWT auth + rate limiting',
      'In-memory fallback for offline demos',
    ],
    lore: 'A PWA that turns watching football into a co-op game. Companion screen syncs to broadcast events; users predict outcomes, climb leaderboards, and collect drop cards. Designed for 390px first.',
  },
  {
    id: 'cv-engine',
    name: 'cv-engine',
    title: 'Computer Vision Engine',
    desc: 'Real-time object detection + segmentation pipeline. PyTorch backbone, ONNX export, inference micro-service.',
    stack: ['Python', 'PyTorch', 'ONNX', 'FastAPI', 'OpenCV'],
    features: ['YOLOv8 fine-tune', 'Streamed video inference', 'Web demo via WebSocket'],
    lore: 'Built during ML research sprint. Squeezes real-time perf out of a single GPU.',
  },
  {
    id: 'flutter-app',
    name: 'amna-flutter',
    title: 'Flutter Companion App',
    desc: 'Cross-platform mobile app for personal productivity + journaling. Hive local store, Riverpod state, custom themes.',
    stack: ['Flutter', 'Dart', 'Riverpod', 'Hive'],
    features: ['Offline-first journal', 'Mood graphs', 'Encrypted local notes'],
    lore: 'Built to dogfood Flutter ergonomics on Android + iOS without native code paths.',
  },
  {
    id: 'ml-playground',
    name: 'ml-playground',
    title: 'ML Playground',
    desc: 'Notebook collection: classifiers, embeddings, attention experiments.',
    stack: ['Python', 'NumPy', 'scikit-learn', 'JAX'],
    features: ['Reproducible runs', 'Visualized loss landscapes', 'Embedding atlases'],
    lore: 'Where ideas crash before production.',
  },
  {
    id: 'this-site',
    name: 'amna-os',
    title: 'amna_OS — this portfolio',
    desc: 'The site you are looking at. Linux desktop + cyberpunk dossier hybrid.',
    stack: ['Vanilla JS', 'CSS Grid', 'Web Animations'],
    features: ['Functional terminal w/ command parser', 'Theme + hack mode', 'SIEM dashboard', 'Draggable icons + windows'],
    lore: 'A vanity OS for one user.',
  },
];

// Website changelog — append newest entries at TOP
const CHANGELOG = [
  {
    version: '1.1.0',
    date: '2026-05-02',
    changes: [
      'whoami now prints ASCII portrait + role expanded with cybersecurity + red-team',
      'FAVORED LANG renamed to STACK — includes linux, git, github, bash',
      'neko prints big cat ASCII alongside wandering sprite',
      'amna heart alignment fixed + portrait ASCII appended',
      'hack mode auto-forces theme to dark on engage',
      'strict command parsing — cd/decrypt/trace/open/sudo/ping require operand; theme validates value',
    ],
  },
  {
    version: '1.0.9',
    date: '2026-05-01',
    changes: [
      'hack mode reverted to green halftone surveillance eye (CSS, no image)',
      'unused assets/bg-hack.png removed',
      'whoami HANDLE now shows github.com/amna0x',
      'contact.bat shows GITHUB instead of HANDLE',
    ],
  },
  {
    version: '1.0.8',
    date: '2026-05-01',
    changes: [
      'reverted light + dark bg to CSS recreation (saturn/clouds/orbs/stars/classified)',
      'hack mode bg swapped to /hackbg/screen.png (cyberpunk wireframe saturn dashboard)',
    ],
  },
  {
    version: '1.0.6',
    date: '2026-05-01',
    changes: [
      'bio CURRENT SPEC updated to: Cybersecurity · Flutter',
      'saturn.nfo expanded with planet stats, why-saturn note, refined typography',
    ],
  },
  {
    version: '1.0.5',
    date: '2026-05-01',
    changes: [
      'removed stuck stop button overlay (esc still works)',
      'no popups on startup — desktop loads clean',
      'terminal: minimize button restored',
      'amna.exe skills reordered: cyber > linux > flutter > css > html > js > cv > ml',
      'desktop icons fully draggable (positions persist)',
      'amna.exe shake animation removed',
      'contact.bat now shows amnamahmood008@gmail.com',
      'vault text forced to high-contrast green/fg for visibility',
      'dark mode background simplified — less cluttered, vaporwave saturn',
      'logs button now displays website changelog',
      'saturn.nfo expanded with hidden command list',
    ],
  },
  {
    version: '1.0.4-vapor',
    date: '2026-04-20',
    changes: [
      'initial amna_OS release — boot sequence + terminal',
      'siem dashboard with simulated event feed',
      'vault project browser, dossier window',
      'theme + hack mode toggles',
      'cat buddy assistant, neko/matrix/hearts FX',
    ],
  },
];

const LORE_FILES = {
  'README.md': 'amna.exe — root user. permissions: chaotic-creative. status: building.',
  'manifesto.txt': '> code is poetry that compiles\n> ship lo-fi, polish later\n> refuse the bland',
  'secrets.enc': '[ENCRYPTED — try `decrypt secrets.enc`]',
};

// --------------------------------------------
// ASCII art (preserved exactly — rendered via .ascii.tiny)
// --------------------------------------------
const NEKO_ART = `⢆⣋⡻⣐⣒⢞⢈⡉⢈⡀⠨⢠⠉⢐⠒⡀⡆⠀⢠⢐⡠⢄⠀⠠⢀⠰⢀⠤⢀⡀⠲⣲⢴⡒⠶⢲⣶⣶⣶⣶⣷⣶⣾⣶⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣯⣜⠰⡮⠐⢚⠎⢾⡁⢅⠙⢐⢒⢴⠒⢮⠨⢤⣄⡷⠴⠌⣄⡂⠈⠠⠈⡀⠂⠄⢣⡜⠡⣁⢦⣾⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡇⡀⠘⢰⢈⠄⠂⡗⠡⢠⢔⠖⠏⠠⠸⡆⡴⢠⣭⣧⡀⠁⠇⡇⠡⠀⡀⢰⠈⠀⠃⣞⠀⠇⠊⣩⢱⣹⢟⢿⡩⢻⢝⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡸⢻⢰⠘⢠⣀⢠⠠⣴⢲⠐⠤⠰⠀⠜⠁⠸⢺⢄⣔⣌⠙⡟⠂⡝⠠⠰⢄⠂⡁⠂⢹⠆⠘⢀⢀⠉⠘⢈⣬⣤⣭⠫⢿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⢡⠓⡔⣐⢤⣿⢀⣘⠁⢲⠁⠘⠰⠠⠨⢀⠚⢁⣠⣄⠈⢚⢉⠁⣄⠈⢩⡇⠀⠐⠀⣏⠠⣉⠆⣸⡀⠠⣿⣿⣿⣿⠀⣺⣿⠿⢿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⢄⠣⡘⢄⠊⠲⡘⠋⢥⢄⠒⠁⢀⠸⡈⠀⢂⢬⣿⣿⣆⠈⢰⠐⢨⠯⠁⠘⠀⡀⠑⠈⡅⡘⡆⢠⢱⣆⠙⢿⣿⠋⣀⣥⡶⣿⣽⡾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣌⠒⣡⠊⡔⠡⢌⠁⠆⡄⢢⠙⡊⣀⡃⢸⠘⡻⡿⣿⠇⢀⠄⡀⠈⢘⢐⣧⢁⠧⢂⠘⠠⠔⢁⠸⠐⠆⡄⡿⣿⢢⢸⣿⠿⡽⣝⢿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣌⠳⡄⠓⡌⢡⠊⢌⠒⡈⢄⠣⣒⠨⠐⠐⣀⠐⣿⣏⠀⢘⢀⢨⢀⢀⢪⣈⠼⡀⡈⢘⢀⠆⢁⠬⠴⠸⠀⣷⣿⣐⠠⢂⣶⠗⡟⣨⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⠼⡱⢌⡓⢌⠢⡉⢆⡘⠰⣈⠒⡄⠠⢄⠰⡁⣰⣿⣿⠀⠰⣸⠰⠀⢨⢤⣄⢲⣾⠀⡀⠊⡲⠧⠘⢌⡑⠠⢾⣿⡜⡜⢋⠋⠾⢡⢟⠞⢝⣿⣩⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⢭⡑⢆⡘⠤⡁⠜⢠⢈⠱⣀⠓⡄⢒⣀⠻⢾⣿⣿⣿⢳⢀⠻⠰⠁⠀⢀⠀⠘⠐⢠⢴⠄⠀⠒⠆⡁⠀⢸⣿⣿⡇⢀⡈⢰⣶⣅⠖⡈⡄⣰⡄⣕⡽⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⢢⠉⢆⡘⠤⢁⠊⡔⢂⠒⢠⠃⠌⡀⠌⢅⣼⢹⠸⣿⣿⣿⣬⣿⣿⣷⣶⣦⣾⣾⣷⣮⣒⣣⣤⣤⠀⠀⣸⣿⣿⣿⡘⣲⠉⡧⠉⣄⠱⠘⣁⡣⢸⡜⡣⠏⡞⣯⢟⡯⣟⡽⣫⢏⡿⣹⢞⣳⢻⣜⡳⣞
⢠⠉⢆⡘⠄⢃⠌⡰⠀⠎⡀⢂⠁⠘⣶⣮⣼⣿⣿⣿⣽⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣿⣿⣿⣿⣿⣷⣿⡀⠩⢤⠁⡌⡐⡸⠐⡆⠱⠃⣉⢆⡋⠖⡭⠲⡍⡞⢴⡩⠞⣬⠓⣌⠳⡜
⠠⡉⢆⠰⣈⠢⠘⡀⠅⠘⠄⣤⡀⣼⣿⣿⣿⡟⣿⣿⢸⣾⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣦⡌⠀⣅⠦⢁⠄⡐⠌⡄⠁⠰⢈⠠⠁⠠⠄⠀⣰⣿
⠰⢁⠎⡐⠤⢡⠂⠴⣀⡨⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⡋⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣦⡌⠀⣅⠦⢁⠄⡐⠌⡄⠁⠰⢈⠠⠁⠠⠄⠀⣰⣿
⢀⠣⠐⠠⠐⠀⢃⣧⣤⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣴⣎⣠⠆⡀⠄⠂⠀⡁⢀⠄⠂⠈⠀⠰⠀⣿⣿
⠂⠄⠉⢐⣀⣱⣌⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣳⠒⠁⠀⠀⠀⠀⡀⠀⠠⠁⠘⠀⢻⣿
⠃⠀⣴⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣶⢾⠁⠎⠐⠁⠈⣀⣤⣴⠅⠀⠉
⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⡤⢰⢀⣴⣾⠟⢉⣥⣶⡶⠟
⣹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣟⣿⣍⢀⡴⠛⠉⣠⡿⠛⠉⠀⠀⣀
⠱⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢹⡿⠿⠋⠁⡀⠐⢋⣤⣶⣆⠀⠰⣿
⠀⢻⣿⣧⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⠿⢿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⢿⣿⣿⣿⣿⣿⣿⣿⣏⣀⠀⠀⠈⠹⣽⣿⣿⣿⣿⠀⠀⠙
⠀⠈⠋⣫⣼⣿⣿⣿⣿⣿⣿⡿⣿⣽⣿⣯⣿⣿⣽⡇⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⣄⠀⢹⣿⣿⣿⣿⣿⣿⣯⣥⠞⠁⠀⠀⠈⠛⠟⠛⠁⠀⠀⠀
⠂⣰⢸⣸⢹⣿⣿⣿⢿⣯⣿⣿⢿⣿⣻⣿⣿⣿⣿⣿⣷⣶⣤⣀⡀⠈⠀⠀⠀⢀⡍⣾⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣇⠀⠀⠈⠀⠀⣀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀
⢂⠧⠧⢈⢸⣿⣿⣿⣟⣯⣷⣿⡿⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⢯⣿⡽⣯⣿⣿⣿⣿⣿⣯⡿⣿⣿⣿⣿⣿⣿⣷⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣟⣉⡁⠀⠀⠀⠀⠀⠀⠀⠀
⠉⡓⡘⣖⢸⣿⣿⣾⢿⣽⣳⣯⣿⢿⡿⣯⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣟⣿⣳⢿⣽⡿⣿⣿⣿⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡷⣄⡀⠀⠀⠀⠀⠀⠀⠀
⢠⠱⠀⢉⣺⢿⣳⡿⣯⢿⣽⣳⡿⣟⣿⣟⣷⣿⣟⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⢯⣿⠾⣯⡟⣎⣳⢻⣽⣿⣿⢿⢿⣿⣽⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣹⠃⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠂⠀⣉⡾⣟⣿⣽⣻⣟⣾⣻⣽⣿⣻⣾⣟⣾⣟⣯⣷⣟⣯⣿⣟⣯⣿⣽⣾⣻⡽⣿⣫⡝⢢⠅⡋⠖⡯⢽⣧⣿⣿⣧⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣿⢯⣷⢯⣷⣻⣞⣯⡷⣯⡷⣟⣾⢷⣯⣟⣾⢯⣿⢾⣽⣻⣾⣳⣯⣷⢿⣳⢯⡟⣥⠚⠤⣈⠱⢫⣾⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣽⣭⣤⣀⠄⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢛⡿⣞⡿⢞⣷⠯⣷⡻⣷⢻⣯⢟⡿⣾⡽⣯⣿⢯⣿⣳⣿⣳⣯⢷⡽⢧⣛⡶⣙⢮⡙⡒⡄⠣⡑⠸⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣛⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠈⢶⣟⣿⣻⣽⣻⢷⣻⣽⣳⣞⢯⡷⣏⣿⣳⣟⣯⣟⡷⣯⢷⡾⣝⡾⣝⣣⢞⡱⣊⠴⠱⡌⠡⠌⠳⡭⢿⣯⢿⣟⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣼⠓⠙⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠁⠘⠼⣳⣟⡾⣽⣻⢮⡷⣛⡾⣯⢷⣻⣞⣷⣻⢾⣽⣻⡽⣯⣟⢾⡽⣭⢛⡬⢒⠅⢊⠡⢄⠡⣈⠱⡈⢧⢻⣻⣾⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⠦⢤⣄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣹⢷⣯⢟⡷⣯⣻⡽⣯⣟⣾⣳⣟⣾⣳⢯⣟⣾⣳⣟⡷⣯⣟⡷⣎⡳⣌⣃⠎⢦⠱⡌⡒⢤⡓⡜⢦⣟⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠋⠃⠂⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢈⡿⣞⡯⣟⡳⢯⢷⣻⡞⣵⢮⡽⢶⢯⣛⡾⣞⣳⢾⣝⡷⣾⣽⣳⣽⢮⣧⣛⣮⣳⠼⣹⡶⣽⣻⣯⣿⢾⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⠍⠉⠀⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⣾⢿⡝⣾⡱⢭⡳⣏⢶⡻⣹⢮⣝⣫⢞⡥⣛⢬⡛⢮⠯⡝⣷⢳⡟⣾⣻⢾⣹⢾⣽⣻⢷⣻⣽⣳⡿⣾⣻⢿⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⣤⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢂⣹⣟⣯⢟⡶⣩⢧⡹⢬⢧⠳⡝⣎⢾⡱⣎⠷⣍⠖⡭⢊⡜⢩⠆⢫⠜⡣⢏⢛⠷⣫⢾⣩⢟⣣⡟⣷⣻⢷⣻⣯⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠷⢀⠄⠀⠀⠀⠀⠀
⠀⠆⡴⢣⠙⣿⠞⣭⠋⠶⠱⠎⡕⣋⢎⡃⠝⣘⢣⠳⡘⠍⢎⡹⢰⠩⠌⠥⢊⢡⠒⡡⠌⠨⠑⡘⠢⡑⠪⠱⡙⠷⠯⣟⠷⠿⣽⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⡄⠀⠀⠀⠀⠀`;

const WHOAMI_ART = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡤⠒⠑⠐⢤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡤⠠⠐⠢⡄⠀⠀⠀⠀⠀⠀⠀⠀⠹⡀⠀⠀⠀⡙⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢅⠀⣀⡔⠁⠀⠀⠀⠀⠀⠀⢀⡠⠒⠩⡳⠄⠴⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⠙⡆⠀⠀⠀⠀⠀⠀⡞⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⢦⠀⠨⠀⠀⠀⠀⠀⢀⠂⠀⠀⠀⠀⢠⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡰⠃⠀⢳⠀⡂⠀⠀⠀⠀⢈⠀⠀⠀⠀⡐⠁⢅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠃⠀⠀⠀⡇⢣⠀⠀⠀⠀⡀⠀⠀⢀⠂⠀⠀⠨⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠇⠀⠀⠀⠀⡇⠸⠀⠀⠀⢀⣄⣀⡰⠀⠀⠀⠀⠀⡃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡜⠉⠉⠉⠀⠀⠀⠀⠀⠀⠋⠈⠉⠁⠀⠈⠀⠀⠀⠀⠀⠀⠀⢱⡀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢑⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡃⠀⠀⠀⠀⠀⠀⠀⡔⠍⢉⠇⠀⠀⠀⠀⠀⠀⢀⠔⢲⠀⠀⠀⠀⠀⠀⡅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠇⠀⠀⠀⠀⠀⠀⢰⠃⡠⠊⠀⠀⠀⠀⠀⠀⠀⠘⠠⠉⠀⠀⠀⠀⠀⡨⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠡⡀⠒⠀⠀. ⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠠⢠⢔⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠂⠀⢅⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢄⠀⠀⠀⠄⠊⠀⠀⠐⠄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠠⠒⠉⠀⠀⠀⠀⠀⠑⡢⠤⣆⣀⡀⡀⠀⠀⠀⠀⠀⢀⠀⠀⠀⢀⡨⠓⢅⠀⠀⠀⠀⠀⠀⠈⠉⠂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠈⠀⠀⠀⠀⠀⣰⠉⠉⠉⠀⠀⠉⠉⢧⠁⠉⠀⠀⠀⠀⠈⠢⢄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠄⠈⠀⠀⠀⠀⠀⠀⢀⠅⠀⠀⠀⠀⠀⠀⠀⠈⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⡎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢣⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢨⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;

const AMNA_KITTY_ART = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣶⣶⣶⣶⣤⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣴⣶⣶⣶⣦⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣿⠿⠉⠀⠀⠉⢻⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⠟⠉⠁⠀⠈⠹⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣀⣤⣴⣿⣿⣿⣿⣧⣄⠀⠀⠀⠀⠀⢻⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣷⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣶⣿⣿⣿⡿⠿⠿⣿⣿⣿⣿⣄⠀⠀⠀⠀⢿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⣴⣾⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⣾⣿⣿⡟⠁⠀⠀⠀⠀⢹⣿⣿⣿⠀⠀⠀⠀⠘⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⡇⠀⠀⠀⠀⢠⣼⣿⣿⣿⠛⠋⠉⠙⢿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢸⣿⣿⣿⠁⢀⣄⠀⠀⠀⢸⣿⣿⣿⠀⠀⠀⠀⠀⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⡇⠀⠀⠀⠀⢸⣿⣿⣿⠁⣤⣴⡆⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢸⣿⣿⣿⣆⠘⠿⠿⢿⣴⣿⣿⣿⠏⠀⠀⠀⠀⠀⢻⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⡇⠀⠀⠀⠀⠸⣿⣿⣿⣦⠙⠛⠃⢠⣼⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣾⣿⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣀⣀⣀⣀⠀⠀⠀⠈⣿⣿⣿⣧⠀⠀⠀⠀⠀⠘⢿⣿⣿⣿⣶⣾⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠙⠛⠻⠿⠿⠟⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡇⣀⣀⣀⣠⣤⣴⣶⣶⣶⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣾⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠙⠻⠿⠿⠿⠟⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠟⠛⠛⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠛⠛⠿⢿⣿⣿⣿⣿⣿⣷⣶⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣾⣿⣿⣿⣿⠿⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠛⠻⢿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣶⣿⣿⣿⡿⠿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠻⢿⣿⣿⣿⣷⣆⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢿⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣾⣿⣿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⣿⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣼⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣧⡀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣾⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⣿⣿⣿⡄⠀⠀⠀⠀
⠀⠀⠀⢀⣾⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣿⡄⠀⠀⠀
⠀⠀⠀⣼⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣧⡄⠀⠀
⠀⠀⣸⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣷⠀⠀
⠀⢠⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⡆⠀
⠀⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⠀
⠀⣿⣿⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⡆
⢀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣤⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣇
⢸⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣤⣄⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⣿⣿⣿⠿⢿⣿⣿⣿⣿⣷⣦⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿
⢸⣿⣿⣷⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣶⣶⣿⣿⡿⠿⠿⣿⣿⣿⣷⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣾⣿⡿⠋⠉⠉⠀⠀⠀⠀⠉⠉⠻⠿⣿⣿⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿
⢸⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⠿⠟⠋⠉⢡⡄⠀⠀⠈⠙⠻⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿
⠘⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⣀⠀⢰⣿⣿⢿⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⠇⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿
⠀⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠿⠀⣿⣿⡏⠈⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⢿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡿
⠀⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣤⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡇
⠀⢻⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⡇
⠀⠀⣿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡿⠀
⠀⠀⠘⣿⣿⣿⣄⡀⠀⠀⠀⣀⠀⠈⢿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣶⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⠁⠀
⠀⠀⠀⠹⣿⣿⣿⣷⠀⠀⠀⣿⠀⠀⠈⠻⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣸⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠿⣿⣿⣷⣶⣤⣄⣀⣀⣠⣴⣶⣿⣿⠿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⠏⠀⠀
⠀⠀⠀⠀⠈⢿⣿⣿⣧⡀⠀⠀⠶⠆⠀⠀⠈⠻⢿⣿⣷⣤⣤⣀⣀⣀⣀⣤⣤⣿⣿⣿⠿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠻⠿⠿⠿⠿⠿⠿⠿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⡟⠀⠀⠀
⠀⠀⠀⠀⠀⠈⢿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⢿⣿⣿⣿⣿⣿⢿⡿⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣠⣤⣤⣤⡀⠀⠀⠀⠀⠀⠷⢸⣿⣷⣿⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⡟⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠛⣴⣶⣶⣬⣵⣾⣷⠀⠀⠀⠀⣤⣀⣀⣤⣤⣴⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣶⣶⣶⣾⣿⣿⣶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⠛⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⣀⣤⣴⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠛⠋⠉⠉⠉⠀⠀⠀⠀⠀⠀⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⣿⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣶⣿⠿⠿⠛⠉⠁⠀⠸⠿⠿⠟⠋⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣿⣿⣿⠟⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣿⣿⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣠⣤⣠⣤⣤⣤⣤⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⠿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀⠀⠀⢀⣠⣶⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣿⣿⣿⣷⣤⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⢃⣤⣤⣾⣿⣿⣿⣿⣿⣭⡁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢿⣿⣿⣿⣷⣶⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠿⠿⢿⣿⣿⣿⣷⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⢿⣿⣿⣿⣿⣿⣶⣦⣤⣤⣀⡀⢀⡀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠛⠋⠀⠀⠀⠀⠀⠀⠀⠉⠙⠻⢿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣿⣿⣿⣿⣿⣿⢿⡿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠿⠿⠛⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣼⣿⣿⣿⡿⠟⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⢿⣿⣿⣷⣀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⡄⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣶⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⠇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣷⡀⠀⠀⠀⠀⠀⠀⢀⣤⣼⣿⣿⣿⠋⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⡀⠀⢀⣠⣴⣶⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣷⣦⣄⡀⠀⠀⠀⠀⠀⣸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣷⣿⣿⣿⣿⣿⡿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⣿⣿⣿⣿⣿⣿⣶⣶⣶⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠿⣿⣿⣿⡍⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠻⠿⠿⠿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣤⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣾⣿⣿⠿⠋⠉⠻⣿⣿⣿⣷⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⣿⣷⣤⣀⣀⣀⣀⣀⣤⣶⣿⣿⣿⡿⠋⠀⠀⠀⠀⠀⠙⠿⣿⣿⣿⣿⣷⣶⣤⣤⣀⣤⣤⣾⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠛⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠈⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;

// --------------------------------------------
// State
// --------------------------------------------
const state = {
  history: [],
  histIdx: -1,
  vaultPath: ['~', 'projects'],
  vaultSelected: null,
  zCounter: 20,
  paranoia: 12,
  fx: { matrix: null, hearts: null, neko: null, banner: null }, // running effect handles
  siemPaused: false,
};

// --------------------------------------------
// DOM helpers
// --------------------------------------------
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// --------------------------------------------
// Boot sequence
// --------------------------------------------
async function boot() {
  const log = $('#boot-log');
  const btn = $('#boot-enter');
  const lines = [
    '[ OK ] Loading amna_OS kernel v1.0.4-vapor',
    '[ OK ] Mounting /dev/dreams',
    '[ OK ] Initializing kernel modules',
    '[ OK ] Bringing up loopback interface',
    '[ OK ] Started Network Manager',
    '[ OK ] Reached target Multi-User System',
    '[ OK ] Loading user profile: amna@amna',
    '[ OK ] Security protocols loaded',
    '[ -- ] Awaiting manual override',
  ];
  for (const l of lines) {
    log.textContent += l + '\n';
    await sleep(180 + Math.random() * 200);
  }
  btn.classList.add('show');

  const enter = () => {
    document.removeEventListener('keydown', onKey);
    btn.removeEventListener('click', enter);
    $('#boot-screen').classList.add('gone');
    setTimeout(() => $('#boot-screen').remove(), 600);
    afterBoot();
  };
  const onKey = (e) => { if (e.key === 'Enter') enter(); };
  document.addEventListener('keydown', onKey);
  btn.addEventListener('click', enter);
}

function afterBoot() {
  ['bio', 'vault', 'status', 'dossier', 'siem', 'saturn', 'terminal'].forEach((a) => closeWindow(a));
  termWelcome();
  catBuddyTick();
  startSiemSimulation();
}

// --------------------------------------------
// Theme + hack mode
// --------------------------------------------
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  if (t !== 'pink') localStorage.setItem('amna-theme', t);
  $('#task-mode').textContent = `MODE: ${t.toUpperCase()}`;
  const ico = $('#theme-toggle .material-symbols-outlined');
  ico.textContent = t === 'dark' ? 'light_mode' : 'dark_mode';
}
function toggleTheme() {
  if (typeof _S !== 'undefined' && _S.on) { _qZ(); return; }
  const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(t);
}
function setHack(on, sub) {
  if (on && typeof _S !== 'undefined' && _S.on) _qZ();
  document.body.classList.toggle('hack', !!on);
  document.body.classList.toggle('dossier', !!(on && sub === 'dossier'));
  $('#task-net').textContent = on ? 'NET: COMPROMISED' : 'NET: SECURE';
}

// --------------------------------------------
// Window management
// --------------------------------------------
function openWindow(app) {
  const win = $(`#win-${app}`);
  if (!win) return;
  win.style.display = 'flex';
  win.classList.remove('minimized');
  bringToFront(win);
  refreshTaskbar();
  if (app === 'vault') renderVault();
  if (app === 'status') renderStatus();
  if (app === 'dossier') renderDossier();
  if (app === 'siem') renderSiemInitial();
  if (app === 'bio') animateBioOpen(win);
  if (typeof gsap !== 'undefined') {
    gsap.fromTo(win, { y: 12, opacity: 0.3, scale: 0.985 }, { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: 'back.out(1.6)' });
  }
}
function animateBioOpen(win) {
  if (typeof gsap === 'undefined') return;
  const bars = win.querySelectorAll('.bar');
  bars.forEach(b => b.style.setProperty('--fill', '0'));
  gsap.to(bars, {
    duration: 0.9,
    ease: 'power2.out',
    stagger: 0.06,
    onUpdate() {
      const p = this.progress();
      bars.forEach(b => {
        const target = parseFloat(b.dataset.fill || 5);
        b.style.setProperty('--fill', (target * p).toFixed(2));
      });
    }
  });
}
function closeWindow(app) {
  const win = $(`#win-${app}`);
  if (!win) return;
  win.style.display = 'none';
  refreshTaskbar();
}
function minimizeWindow(app) {
  const win = $(`#win-${app}`);
  if (!win) return;
  win.classList.add('minimized');
  refreshTaskbar();
}
function maxToggle(win) { win.classList.toggle('maximized'); }
function bringToFront(win) { state.zCounter += 1; win.style.zIndex = state.zCounter; }
function refreshTaskbar() {
  const cont = $('#task-windows');
  cont.innerHTML = '';
  $$('.win').forEach((w) => {
    if (w.style.display === 'none') return;
    const app = w.dataset.app;
    const pill = document.createElement('button');
    pill.className = 'task-pill' + (w.classList.contains('minimized') ? '' : ' active');
    pill.textContent = `> ${app}`;
    pill.addEventListener('click', () => {
      if (w.classList.contains('minimized')) { w.classList.remove('minimized'); bringToFront(w); }
      else bringToFront(w);
      refreshTaskbar();
    });
    cont.appendChild(pill);
  });
}

// --------------------------------------------
// Drag (windows + icons)
// --------------------------------------------
function makeDraggable(el, handle, opts = {}) {
  const isIcon = !!opts.icon;
  let sx, sy, ox, oy, dragging = false, moved = false;
  const start = (e) => {
    if (isIcon) {
      if (e.target.closest('.win-btn,input,a')) return;
    } else {
      if (e.target.closest('.win-btn,button,input,a')) return;
    }
    dragging = true; moved = false;
    el.classList.add('dragging');
    bringToFront(el);
    const p = pointer(e);
    sx = p.x; sy = p.y;
    const rect = el.getBoundingClientRect();
    const parent = el.parentElement.getBoundingClientRect();
    ox = rect.left - parent.left; oy = rect.top - parent.top;
    if (e.cancelable && !isIcon) e.preventDefault();
  };
  const move = (e) => {
    if (!dragging) return;
    const p = pointer(e);
    const dx = p.x - sx, dy = p.y - sy;
    if (Math.abs(dx) + Math.abs(dy) > 4) moved = true;
    if (isIcon && !moved) return;
    const nx = ox + dx;
    const ny = oy + dy;
    el.style.left = Math.max(0, nx) + 'px';
    el.style.top = Math.max(0, ny) + 'px';
    if (e.cancelable) e.preventDefault();
  };
  const end = () => {
    if (!dragging) return;
    dragging = false;
    el.classList.remove('dragging');
    if (isIcon) {
      persistIconPos();
      el._lastDragMoved = moved;
    }
  };
  handle.addEventListener('mousedown', start);
  handle.addEventListener('touchstart', start, { passive: false });
  document.addEventListener('mousemove', move);
  document.addEventListener('touchmove', move, { passive: false });
  document.addEventListener('mouseup', end);
  document.addEventListener('touchend', end);
}
function pointer(e) {
  if (e.touches && e.touches[0]) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  return { x: e.clientX, y: e.clientY };
}
function persistIconPos() {
  const positions = {};
  $$('.d-icon').forEach((i) => positions[i.dataset.app] = { left: i.style.left, top: i.style.top });
  localStorage.setItem('amna-icons', JSON.stringify(positions));
}
function restoreIconPos() {
  try {
    const p = JSON.parse(localStorage.getItem('amna-icons') || '{}');
    $$('.d-icon').forEach((i) => {
      if (p[i.dataset.app]) {
        i.style.left = p[i.dataset.app].left;
        i.style.top = p[i.dataset.app].top;
      }
    });
  } catch (e) { /* ignore */ }
}

// --------------------------------------------
// Terminal
// --------------------------------------------
const out = () => $('#term-output');
function termLine(html, cls = '') {
  const div = document.createElement('div');
  div.className = 'line ' + cls;
  div.innerHTML = html;
  out().appendChild(div);
  out().scrollTop = out().scrollHeight;
  return div;
}
function termClear() { out().innerHTML = ''; }
function termWelcome() {
  termLine(`<span class="muted">amna_OS 1.0.4-vapor (gnu/linux) — ${new Date().toString().split(' ').slice(0,5).join(' ')}</span>`);
  termLine(`<span class="muted">last login: ${new Date(Date.now() - 86400000).toString().split(' ').slice(0,5).join(' ')} on tty1</span>`);
  termLine(`<span class="ok">welcome, amna.</span> type <span class="accent">help</span> to begin. press <span class="accent">ESC</span> to stop animations.`);
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// --------------------------------------------
// FX banner (running animation status + stop)
// --------------------------------------------
function showBanner() { /* removed — stop button no longer shown */ }
function hideBanner() { /* no-op */ }
function stopAllFx() {
  let stopped = [];
  if (state.fx.matrix) { state.fx.matrix.stop(); state.fx.matrix = null; stopped.push('matrix'); }
  if (state.fx.hearts) { state.fx.hearts.stop(); state.fx.hearts = null; stopped.push('hearts'); }
  if (state.fx.neko) { state.fx.neko.stop(); state.fx.neko = null; stopped.push('neko'); }
  hideBanner();
  return stopped;
}

// --------------------------------------------
// Commands
// --------------------------------------------
const COMMANDS = {
  help: () => {
    const list = [
      ['help', 'show this list'],
      ['amna', 'spawn pixel hearts (vanity daemon, auto-end ~10s)'],
      ['whoami', 'identity readout'],
      ['hack', 'toggle full surveillance aesthetic mode'],
      ['scan', 'simulated network scan'],
      ['vault', 'open project vault'],
      ['open <project>', 'open project detail panel'],
      ['ls [path]', 'list directory contents'],
      ['cat <file>', 'show project description / lore'],
      ['cd <path>', 'change directory (cosmetic)'],
      ['siem', 'open SIEM dashboard'],
      ['clear', 'wipe terminal'],
      ['sudo <cmd>', 'attempt elevation (denied)'],
      ['ping reality', 'request timed out'],
      ['status', 'show system stats'],
      ['theme [dark|light]', 'toggle ui theme'],
      ['neko', 'spawn pixel cat (auto-end ~10s)'],
      ['matrix', 'falling code animation (auto-end ~10s)'],
      ['decrypt <file>', 'decode animation'],
      ['trace <user>', 'classified dossier on target'],
      ['stop', 'stop any running animation'],
      ['exit', 'minimize terminal'],
    ];
    list.forEach(([c, d]) => termLine(`  <span class="accent">${escapeHtml(c.padEnd(20))}</span><span class="muted">${escapeHtml(d)}</span>`));
    termLine('<span class="muted">tip: arrow-up = history. tab = autocomplete. ESC = stop animations.</span>');
  },

  amna: async () => {
    termLine('<span class="pink">> vanity daemon engaged. raining hearts for ~10s. press ESC or type `stop` to end early.</span>');
    spawnHearts(10000);
    await sleep(150);
    const heart = `  .-.   .-.
 (       )
  \\     /
   \\   /
    \\ /
     v`;
    termLine(`<div class="ascii-row"><pre class="ascii heart">${escapeHtml(heart)}</pre><pre class="ascii tiny">${escapeHtml(WHOAMI_ART)}</pre></div>`);
    termLine('<span class="muted">// amna.sys :: rendered with purple</span>');
  },

  whoami: () => {
    termLine(`<pre class="ascii tiny">${escapeHtml(AMNA_KITTY_ART)}</pre>`);
    const lines = [
      'IDENT          : amna.mahmood',
      'HANDLE         : github.com/amna0x',
      'ROLE           : full-stack dev / cv researcher / cybersecurity analyst / red-team enthusiast',
      'LOCATION       : DI Khan, PK  →  somewhere on the grid',
      'ALIGNMENT      : lawful chaotic',
      'WEAKNESS       : pizza, late-night refactors',
      'STACK          : python, javascript, dart, linux, git, github, bash, sarcasm',
      'CLEARANCE      : ROOT',
    ];
    lines.forEach(l => termLine(`<span class="muted">${escapeHtml(l)}</span>`));
  },

  hack: async () => {
    const on = !document.body.classList.contains('hack');
    if (on) {
      termLine('<span class="warn">> initiating aesthetic override...</span>');
      await sleep(160);
      if (document.documentElement.getAttribute('data-theme') !== 'dark') {
        setTheme('dark');
        termLine('<span class="warn">> forcing theme: dark (lights out for ops).</span>');
        await sleep(120);
      }
      termLine('<span class="warn">> deploying scanlines + grain...</span>');
      await sleep(160);
      const sub = Math.random() < 0.5 ? 'dossier' : null;
      setHack(true, sub);
      termLine(`<span class="ok">> mode: ${sub || 'surveillance'}.</span> type <span class="accent">hack</span> again to disengage.`);
    } else {
      setHack(false);
      termLine('<span class="muted">> aesthetic override disengaged.</span>');
    }
  },

  scan: async () => {
    termLine('<span class="muted">starting nmap-lite scan on 10.0.0.0/16...</span>');
    const ips = [];
    for (let i = 0; i < 6; i++) ips.push(`10.0.${rand(0,255)}.${rand(0,255)}`);
    for (const ip of ips) {
      await sleep(280);
      const ports = [22, 80, 443, 8080, 5432].filter(() => Math.random() > 0.4);
      const open = ports.map(p => `<span class="ok">${p}/open</span>`).join(' ');
      termLine(`  <span class="accent">${ip}</span>   ${open || '<span class="muted">no open ports</span>'}`);
    }
    await sleep(200);
    termLine('<span class="ok">scan complete.</span>');
  },

  vault: () => { openWindow('vault'); termLine('<span class="ok">> vault mounted.</span>'); },
  siem:  () => { openWindow('siem');  termLine('<span class="ok">> SIEM dashboard online.</span>'); },

  open: (args) => {
    if (!args[0]) return termLine('<span class="err">open: missing operand.</span> usage: <span class="accent">open &lt;project&gt;</span>. try <span class="accent">ls</span>.');
    const id = args[0].toLowerCase();
    const proj = PROJECTS.find(p => p.id === id || p.name === id);
    if (!proj) return termLine(`<span class="err">open: no such project "${escapeHtml(id)}".</span> try <span class="accent">ls</span>.`);
    state.vaultSelected = proj.id;
    openWindow('vault');
    showProjectDetail(proj.id);
    termLine(`<span class="ok">> opened ${escapeHtml(proj.name)}.</span>`);
  },

  ls: (args) => {
    const p = (args[0] || '').replace(/^\//, '');
    if (!p || p === 'projects' || p === '~/projects') {
      termLine('<span class="muted">total ' + PROJECTS.length + '</span>');
      PROJECTS.forEach((pr) => {
        termLine(`<span class="muted">drwxr-xr-x  amna  amna  </span><span class="accent">${escapeHtml(pr.name)}/</span>   <span class="muted">${escapeHtml(pr.title)}</span>`);
      });
    } else if (p === '~' || p === 'home') {
      ['projects/', 'manifesto.txt', 'README.md', 'secrets.enc'].forEach(f => termLine(`<span class="accent">${escapeHtml(f)}</span>`));
    } else {
      termLine(`<span class="err">ls: ${escapeHtml(p)}: no such directory</span>`);
    }
  },

  cat: (args) => {
    const f = args[0];
    if (!f) return termLine('<span class="err">cat: missing operand</span>');
    if (LORE_FILES[f]) return termLine(`<span class="muted">${escapeHtml(LORE_FILES[f])}</span>`);
    const proj = PROJECTS.find(p => p.name === f.replace(/\/$/, '') || p.id === f);
    if (proj) {
      termLine(`<span class="accent">═══ ${escapeHtml(proj.title)} ═══</span>`);
      termLine(escapeHtml(proj.desc));
      termLine(`<span class="muted">stack:</span> ${proj.stack.map(s=>`<span class="accent">${escapeHtml(s)}</span>`).join(', ')}`);
      termLine(`<span class="muted">lore:</span> ${escapeHtml(proj.lore || '')}`);
      return;
    }
    termLine(`<span class="err">cat: ${escapeHtml(f)}: no such file</span>`);
  },

  cd: (args) => {
    if (!args[0]) return termLine('<span class="err">cd: missing operand.</span> usage: <span class="accent">cd &lt;path&gt;</span>');
    termLine('<span class="muted">(cosmetic only — try `vault` for navigation)</span>');
  },

  clear: async () => {
    out().style.transition = 'filter 0.18s';
    out().style.filter = 'blur(6px) brightness(2)';
    await sleep(160);
    termClear();
    out().style.filter = '';
  },

  sudo: (args) => {
    if (!args[0]) return termLine('<span class="err">sudo: a command must be specified.</span> usage: <span class="accent">sudo &lt;command&gt;</span>');
    const sass = [
      'nice try.',
      'permission denied. and also: bold of you.',
      'sudo: you are not in the sudoers file. this incident has been ignored.',
      'lol no.',
    ];
    termLine(`<span class="err">${escapeHtml(sass[rand(0, sass.length - 1)])} :skull:</span>`);
  },

  ping: (args) => {
    if (!args[0]) return termLine('<span class="err">ping: missing operand.</span> usage: <span class="accent">ping &lt;host&gt;</span>');
    if (args[0] !== 'reality') return termLine(`<span class="err">ping: ${escapeHtml(args[0])}: name or service not known</span>`);
    [1, 2, 3, 4].forEach((n) => setTimeout(() => termLine(`<span class="muted">PING reality.local: seq=${n}  </span><span class="err">request timed out.</span>`), n * 600));
    setTimeout(() => termLine('<span class="err">--- reality.local ping statistics --- 4 packets transmitted, 0 received, 100% packet loss.</span>'), 2800);
  },

  status: () => { openWindow('status'); termLine('<span class="ok">> status panel summoned.</span>'); },

  theme: (args) => {
    const t = (args[0] || '').toLowerCase();
    if (t && t !== 'dark' && t !== 'light') {
      return termLine(`<span class="err">theme: invalid mode '${escapeHtml(args[0])}'.</span> usage: <span class="accent">theme [dark|light]</span>`);
    }
    if (typeof _S !== 'undefined' && _S.on) _qZ();
    if (t === 'dark' || t === 'light') setTheme(t);
    else toggleTheme();
    termLine(`<span class="ok">> theme: ${document.documentElement.getAttribute('data-theme')}.</span>`);
  },

  neko: () => {
    spawnNeko(10000);
    termLine('<span class="pink">> neko spawned — wandering for ~10s. press ESC or type `stop` to send her home.</span>');
    termLine(`<pre class="ascii tiny">${escapeHtml(NEKO_ART)}</pre>`);
  },

  matrix: async () => {
    termLine('<span class="ok">> entering the matrix for ~10s. press ESC or type `stop` to exit early.</span>');
    startMatrix(10000);
  },

  decrypt: async (args) => {
    if (!args[0]) return termLine('<span class="err">decrypt: missing operand.</span> usage: <span class="accent">decrypt &lt;file&gt;</span>');
    const f = args[0];
    termLine(`<span class="warn">decrypting ${escapeHtml(f)}...</span>`);
    const chars = '!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const target = `KEY=access_grant_${rand(1000,9999)}  PAYLOAD=ok`;
    const div = document.createElement('div');
    div.className = 'line ok';
    out().appendChild(div);
    for (let i = 0; i <= target.length; i++) {
      let s = target.slice(0, i);
      for (let j = i; j < target.length; j++) s += chars[rand(0, chars.length - 1)];
      div.textContent = s;
      out().scrollTop = out().scrollHeight;
      await sleep(40);
    }
    termLine('<span class="ok">> decrypt complete.</span>');
  },

  trace: (args) => {
    if (!args[0]) return termLine('<span class="err">trace: missing operand.</span> usage: <span class="accent">trace &lt;user&gt;</span>');
    const t = args[0];
    openWindow('dossier');
    renderDossier(t);
    termLine(`<span class="ok">> trace started on ${escapeHtml(t)}. dossier opened.</span>`);
  },

  stop: () => {
    const stopped = stopAllFx();
    if (stopped.length === 0) termLine('<span class="muted">nothing running.</span>');
    else termLine(`<span class="ok">stopped: ${stopped.join(', ')}.</span>`);
  },

  exit: () => { minimizeWindow('terminal'); },
};

// Per-command spam throttle: max 2 invocations per 3s window, then cooldown.
// FX commands also blocked while their effect is already running.
const CMD_THROTTLE = {};
const THROTTLE_WINDOW_MS = 3000;
const THROTTLE_MAX_BURST = 2;
const THROTTLE_COOLDOWN_MS = 4000;
const FX_COMMANDS = { amna: 'hearts', matrix: 'matrix', neko: 'neko' };

function isThrottled(cmd) {
  const now = performance.now();
  const rec = CMD_THROTTLE[cmd] || { calls: [], blockedUntil: 0 };
  if (now < rec.blockedUntil) {
    CMD_THROTTLE[cmd] = rec;
    return Math.ceil((rec.blockedUntil - now) / 1000);
  }
  rec.calls = rec.calls.filter(t => now - t < THROTTLE_WINDOW_MS);
  if (rec.calls.length >= THROTTLE_MAX_BURST) {
    rec.blockedUntil = now + THROTTLE_COOLDOWN_MS;
    rec.calls = [];
    CMD_THROTTLE[cmd] = rec;
    return Math.ceil(THROTTLE_COOLDOWN_MS / 1000);
  }
  rec.calls.push(now);
  CMD_THROTTLE[cmd] = rec;
  return 0;
}

async function runCommand(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return;
  termLine(`<span class="p-user">root</span><span class="p-at">@</span><span class="p-host">amna</span><span class="p-colon">:</span><span class="p-path">~</span><span class="p-dollar">$</span> ${escapeHtml(trimmed)}`);
  state.history.unshift(trimmed);
  state.histIdx = -1;
  const [rawCmd, ...args] = trimmed.split(/\s+/);
  const cmd = rawCmd.toLowerCase();
  const fn = COMMANDS[cmd];
  if (!fn) {
    if (cmd && cmd.length >= 3 && cmd.length <= 12) {
      try {
        const h = await _d8(cmd);
        if (h === _K9) { _q0(); return; }
      } catch (_) { /* ignore */ }
    }
    return termLine(`<span class="err">${escapeHtml(cmd)}: command not found.</span> try <span class="accent">help</span>.`);
  }
  const fxKey = FX_COMMANDS[cmd];
  if (fxKey && state.fx[fxKey]) {
    return termLine(`<span class="warn">${escapeHtml(cmd)}: already running. ESC or \`stop\` to end.</span>`);
  }
  const wait = isThrottled(cmd);
  if (wait) {
    return termLine(`<span class="warn">${escapeHtml(cmd)}: rate-limited. wait ${wait}s.</span>`);
  }
  try { fn(args); } catch (e) { termLine(`<span class="err">err: ${escapeHtml(String(e.message || e))}</span>`); }
}

// --------------------------------------------
// Vault rendering
// --------------------------------------------
function renderVault() {
  const grid = $('#vault-grid');
  const detail = $('#vault-detail');
  detail.hidden = true;
  grid.style.display = 'grid';
  $('.vault-path').textContent = '/home/amna/projects';
  $('[data-vault-back]').setAttribute('disabled', '');
  grid.innerHTML = '';
  PROJECTS.forEach((p) => {
    const item = document.createElement('button');
    item.className = 'vault-item';
    item.innerHTML = `
      <div class="vault-icon"><span class="material-symbols-outlined">folder</span></div>
      <div class="vault-name">${escapeHtml(p.name)}</div>
      <div class="vault-tag">${escapeHtml(p.stack[0])}</div>
    `;
    item.addEventListener('click', () => showProjectDetail(p.id));
    grid.appendChild(item);
  });
}
function showProjectDetail(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  const grid = $('#vault-grid');
  const detail = $('#vault-detail');
  grid.style.display = 'none';
  detail.hidden = false;
  $('.vault-path').textContent = `/home/amna/projects/${p.name}`;
  $('[data-vault-back]').removeAttribute('disabled');
  detail.innerHTML = `
    <h2>${escapeHtml(p.title)}</h2>
    <div class="desc">${escapeHtml(p.desc)}</div>
    <div class="detail-section"><h3>Stack</h3><div class="tags">${p.stack.map(s => `<span class="tag">${escapeHtml(s)}</span>`).join('')}</div></div>
    <div class="detail-section"><h3>Features</h3><ul class="feature-list">${p.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul></div>
    <div class="detail-section"><h3>Lore</h3><p>${escapeHtml(p.lore || '')}</p></div>
  `;
}

// --------------------------------------------
// Status window
// --------------------------------------------
function renderStatus() {
  const cpu = rand(8, 64);
  const mem = rand(30, 78);
  const net = rand(5, 99);
  state.paranoia = clamp(state.paranoia + rand(-3, 5), 0, 100);
  $('#status-body').innerHTML = `
    <div class="stat-row"><span>CPU</span><span>${cpu}%</span></div>
    <div class="stat-bar"><i style="width:${cpu}%"></i></div>
    <div class="stat-row"><span>MEMORY</span><span>${mem}%</span></div>
    <div class="stat-bar"><i style="width:${mem}%; background: var(--secondary)"></i></div>
    <div class="stat-row"><span>NETWORK</span><span>${net}%</span></div>
    <div class="stat-bar"><i style="width:${net}%; background: var(--tertiary)"></i></div>
    <div class="stat-row"><span>PARANOIA</span><span>${state.paranoia}%</span></div>
    <div class="stat-bar"><i style="width:${state.paranoia}%; background: ${state.paranoia > 60 ? 'var(--error)' : 'var(--warn)'}"></i></div>
    <div class="stat-row" style="margin-top:14px"><span>UPTIME</span><span>${(Math.floor(performance.now() / 1000))}s session</span></div>
    <div class="stat-row"><span>HOST</span><span>amna@amna</span></div>
    <div class="stat-row"><span>KERNEL</span><span>vapor-1.0.4</span></div>
    <div class="stat-row"><span>SHELL</span><span>/bin/dreams</span></div>
  `;
}
setInterval(() => { if ($('#win-status').style.display !== 'none') renderStatus(); }, 2000);

// --------------------------------------------
// Dossier window
// --------------------------------------------
function renderDossier(target = 'amna.mahmood') {
  const id = `AMNA-${rand(1000,9999)}-${target.toUpperCase().slice(0,4).padEnd(4,'X')}`;
  const cells = [
    ['SUBJECT', target],
    ['STATUS', 'ACTIVE / TRACKED'],
    ['LAST SEEN', new Date().toLocaleString()],
    ['NODE', `@${rand(0,255)}.${rand(0,255)}.${rand(0,255)}.${rand(0,255)}`],
    ['THREAT LEVEL', ['LOW','MEDIUM','HIGH','CRITICAL'][rand(0,3)]],
    ['ASSET ID', id],
    ['ENCRYPTION', 'AES-256-GCM'],
    ['CLEARANCE', 'OMEGA'],
  ];
  $('#dossier-body').innerHTML = `
    <h2>// CLASSIFIED // FILE ${id}</h2>
    <div class="dossier-grid">
      ${cells.map(([k, v]) => `<div class="dossier-cell"><label>${escapeHtml(k)}</label><div>${escapeHtml(String(v))}</div></div>`).join('')}
    </div>
    <div class="dossier-cell" style="margin-top:10px">
      <label>NOTES</label>
      <div>Subject demonstrates non-trivial pattern of after-hours commits. Surveillance ongoing. Recommend continued passive monitoring.</div>
    </div>
  `;
}

// --------------------------------------------
// SIEM dashboard
// --------------------------------------------
const SIEM_SOURCES = ['auth.svc', 'api-gw', 'db.master', 'edge-cdn', 'k8s-node', 'iam.core', 'firewall', 'vault.kv'];
const SIEM_EVENTS = [
  ['INFO', 'auth.svc', 'user login successful'],
  ['LOW',  'api-gw',   'rate-limit window reset'],
  ['LOW',  'edge-cdn', 'cache miss → upstream fetch'],
  ['MED',  'firewall', 'unusual outbound connection'],
  ['MED',  'db.master','slow query detected (~1.4s)'],
  ['HIGH', 'auth.svc', 'failed login burst from single IP'],
  ['HIGH', 'iam.core', 'privilege escalation attempted'],
  ['CRIT', 'firewall', 'port scan from unknown ASN'],
  ['CRIT', 'vault.kv', 'unauthorized secret read'],
  ['INFO', 'k8s-node', 'pod scheduled successfully'],
];
const SIEM_BUF = { CRIT: 0, HIGH: 0, MED: 0, LOW: 0, sparkline: new Array(60).fill(0) };

function renderSiemInitial() {
  // seed feed if empty
  if (!$('#siem-events').children.length) {
    for (let i = 0; i < 6; i++) addSiemEvent(true);
  }
  // map nodes
  const map = $('#siem-map');
  map.innerHTML = '';
  for (let i = 0; i < 14; i++) {
    const n = document.createElement('div');
    const sev = Math.random() < 0.15 ? 'crit' : Math.random() < 0.35 ? 'high' : '';
    n.className = 'node ' + sev;
    n.style.left = (8 + Math.random() * 84) + '%';
    n.style.top = (8 + Math.random() * 84) + '%';
    map.appendChild(n);
  }
  drawSpark();
  renderSiemMetrics();
}
function addSiemEvent(silent = false) {
  if (state.siemPaused && !silent) return;
  const [sev, src, msg] = SIEM_EVENTS[rand(0, SIEM_EVENTS.length - 1)];
  if (sev !== 'INFO') SIEM_BUF[sev] = Math.min(99, SIEM_BUF[sev] + 1);
  const ts = new Date().toTimeString().slice(0, 8);
  const row = document.createElement('div');
  row.className = 'event-row';
  row.innerHTML = `<span class="ts">${ts}</span><span class="sev ${sev}">${sev}</span><span class="msg">${escapeHtml(src)} — ${escapeHtml(msg)}</span>`;
  const list = $('#siem-events');
  list.insertBefore(row, list.firstChild);
  while (list.children.length > 80) list.removeChild(list.lastChild);
  // sparkline tick
  const intensity = sev === 'CRIT' ? 5 : sev === 'HIGH' ? 3 : sev === 'MED' ? 2 : 1;
  SIEM_BUF.sparkline.push(intensity);
  SIEM_BUF.sparkline.shift();
  drawSpark();
  renderSiemMetrics();
}
function renderSiemMetrics() {
  $('#m-crit').textContent = SIEM_BUF.CRIT;
  $('#m-high').textContent = SIEM_BUF.HIGH;
  $('#m-med').textContent  = SIEM_BUF.MED;
  $('#m-low').textContent  = SIEM_BUF.LOW;
  $('#bar-crit').style.width = clamp(SIEM_BUF.CRIT * 3, 0, 100) + '%';
  $('#bar-high').style.width = clamp(SIEM_BUF.HIGH * 2, 0, 100) + '%';
  $('#bar-med').style.width  = clamp(SIEM_BUF.MED * 1.5, 0, 100) + '%';
  $('#bar-low').style.width  = clamp(SIEM_BUF.LOW * 1.2, 0, 100) + '%';
}
function drawSpark() {
  const c = $('#siem-spark'); if (!c) return;
  const ctx = c.getContext('2d');
  const w = c.width, h = c.height;
  ctx.clearRect(0, 0, w, h);
  // grid
  ctx.strokeStyle = 'rgba(124,58,237,0.18)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.moveTo(0, (h/4)*i); ctx.lineTo(w, (h/4)*i); ctx.stroke(); }
  // line
  const max = Math.max(5, ...SIEM_BUF.sparkline);
  ctx.strokeStyle = '#4ade80';
  ctx.fillStyle = 'rgba(74,222,128,0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  SIEM_BUF.sparkline.forEach((v, i) => {
    const x = (i / (SIEM_BUF.sparkline.length - 1)) * w;
    const y = h - (v / max) * (h - 4) - 2;
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.stroke();
  ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath(); ctx.fill();
}
function startSiemSimulation() {
  setInterval(() => addSiemEvent(), 1400);
  setInterval(() => {
    // decay
    SIEM_BUF.CRIT = Math.max(0, SIEM_BUF.CRIT - 1);
    SIEM_BUF.HIGH = Math.max(0, SIEM_BUF.HIGH - 1);
    SIEM_BUF.MED  = Math.max(0, SIEM_BUF.MED  - 2);
    SIEM_BUF.LOW  = Math.max(0, SIEM_BUF.LOW  - 1);
    renderSiemMetrics();
  }, 4000);
}

// --------------------------------------------
// Hearts (amna command)
// --------------------------------------------
function spawnHearts(durationMs = 10000) {
  if (state.fx.hearts) state.fx.hearts.stop();
  showBanner('hearts running...');
  const layer = $('#hearts-layer');
  const start = performance.now();
  let running = true;
  const tick = () => {
    if (!running || performance.now() - start > durationMs) {
      running = false;
      hideBanner();
      state.fx.hearts = null;
      return;
    }
    for (let i = 0; i < 2; i++) {
      const h = document.createElement('div');
      h.className = 'heart' + (Math.random() < 0.3 ? ' big' : Math.random() < 0.5 ? ' tiny' : '');
      h.style.left = (Math.random() * 100) + '%';
      h.style.setProperty('--dur', (3 + Math.random() * 3) + 's');
      const shades = ['#c084fc', '#a78bfa', '#d8b4fe', '#9333ea', '#e9d5ff'];
      h.style.background = shades[rand(0, shades.length - 1)];
      layer.appendChild(h);
      setTimeout(() => h.remove(), 6000);
    }
    setTimeout(tick, 140);
  };
  tick();
  state.fx.hearts = { stop: () => { running = false; hideBanner(); } };
}

// --------------------------------------------
// Neko cat — terminal-spawned wandering cat
// --------------------------------------------
function spawnNeko(durationMs = 10000) {
  if (state.fx.neko) state.fx.neko.stop();
  showBanner('neko wandering... press ESC to end');
  const layer = $('#neko-layer');
  const cat = document.createElement('div');
  cat.className = 'neko';
  const sprite = ['.b....b.', 'bb....bb', 'bbbbbbbb', 'bwbbbbwb', 'bbbbbbbb', 'bpbbbbpb', '.bbbbbb.', '..bb.bb.'];
  sprite.forEach(row => { for (const c of row) { const s = document.createElement('span'); if (c !== '.') s.className = c; cat.appendChild(s); } });
  cat.style.left = '20%'; cat.style.top = '60%';
  cat.style.transform = 'scale(2)'; cat.style.transformOrigin = 'top left';
  layer.appendChild(cat);
  let t = 0; let running = true; const start = performance.now();
  const id = setInterval(() => {
    if (!running || performance.now() - start > durationMs) { clearInterval(id); cat.remove(); hideBanner(); state.fx.neko = null; running = false; return; }
    t += 1;
    const x = 20 + Math.sin(t * 0.08) * 30 + (t * 0.2);
    const y = 50 + Math.cos(t * 0.05) * 20;
    cat.style.left = (x % 90) + '%';
    cat.style.top = (y % 80) + '%';
  }, 80);
  state.fx.neko = { stop: () => { running = false; clearInterval(id); cat.remove(); hideBanner(); } };
}

// --------------------------------------------
// Matrix
// --------------------------------------------
function startMatrix(durationMs = 10000) {
  if (state.fx.matrix) state.fx.matrix.stop();
  showBanner('matrix running... press ESC to end');
  document.body.classList.add('matrix-on');
  const c = $('#fx-canvas');
  const ctx = c.getContext('2d');
  const rect = $('#desktop').getBoundingClientRect();
  c.width = rect.width; c.height = rect.height;
  c.style.left = '0'; c.style.top = '0';
  const cols = Math.floor(c.width / 16);
  const drops = Array(cols).fill(0).map(() => Math.random() * c.height);
  const chars = 'アイウエオカキクケコｱｲｳｴｵabcdef0123456789∆∑≡';
  let stop = false;
  const stopFn = () => { stop = true; document.body.classList.remove('matrix-on'); ctx.clearRect(0, 0, c.width, c.height); hideBanner(); state.fx.matrix = null; };
  const timer = setTimeout(stopFn, durationMs);
  const draw = () => {
    if (stop) return;
    ctx.fillStyle = 'rgba(5,8,7,0.12)';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#4ade80';
    ctx.font = '14px JetBrains Mono, monospace';
    for (let i = 0; i < drops.length; i++) {
      const ch = chars[rand(0, chars.length - 1)];
      ctx.fillText(ch, i * 16, drops[i]);
      if (drops[i] > c.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 16;
    }
    requestAnimationFrame(draw);
  };
  draw();
  state.fx.matrix = { stop: () => { clearTimeout(timer); stopFn(); } };
}

// --------------------------------------------
// Cat assistant (Win XP dog replacement)
// --------------------------------------------
const CAT_TIPS = [
  'meow. type `help` for commands.',
  'try `amna` — i made you something.',
  'click an icon to launch. drag to move.',
  'press ESC to stop any animation.',
  'type `siem` for the security dashboard.',
  'theme too bright? type `theme dark`.',
  'try `trace amna` for a classified file.',
  '`ls` and `cat <project>` work in this terminal.',
  'i am surveillance-grade fluffy. carry on.',
  'tab autocompletes commands.',
];
function catBuddyTick() {
  const cat = $('#cat-sprite');
  const bubble = $('#cat-bubble');
  const msg = $('#cat-msg');
  const say = (text, ms = 4000) => {
    msg.textContent = text;
    bubble.hidden = false;
    cat.classList.add('wave');
    clearTimeout(catBuddyTick._t);
    catBuddyTick._t = setTimeout(() => { bubble.hidden = true; cat.classList.remove('wave'); }, ms);
  };
  cat.addEventListener('click', () => say(CAT_TIPS[rand(0, CAT_TIPS.length - 1)]));
  bubble.addEventListener('click', () => { bubble.hidden = true; });
  // periodic spontaneous tip
  setInterval(() => { if (Math.random() < 0.5) say(CAT_TIPS[rand(0, CAT_TIPS.length - 1)], 5000); }, 25000);
  // initial
  setTimeout(() => say('meow. need help searching?'), 1500);
}

// --------------------------------------------
// Flutter glitch on amna.exe icon (occasional)
// --------------------------------------------
function scheduleFlutter() {
  const target = $('.flutter-target');
  if (!target) return;
  const tick = () => {
    target.classList.add('fluttering');
    setTimeout(() => target.classList.remove('fluttering'), 700);
    setTimeout(tick, 6000 + Math.random() * 9000);
  };
  setTimeout(tick, 4000);
}

// --------------------------------------------
// Utils
// --------------------------------------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// --------------------------------------------
// Reserved subsystem (h)
// --------------------------------------------
const _K9 = 'c6142cdbbd05b7f761a73a0e6e74bcf2fa20e936985f036e0279faf6016f0104';
const _S = { on: false, audio: null, raf: 0, t: 0, sprites: [], swapInt: 0, fadeInt: 0, savedTheme: null };

async function _d8(s) {
  const buf = new TextEncoder().encode(s);
  const h = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(h)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function _q0() {
  if (_S.on) return;
  _S.on = true;
  _S.savedTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  if (document.body.classList.contains('hack')) setHack(false);
  document.documentElement.setAttribute('data-theme', 'pink');
  document.documentElement.classList.add('hx-on');
  document.body.classList.add('hx-on');

  const palette = ['#8A9A5B', '#F7CAC9', '#B8C58C', '#FADADD', '#A4B47A', '#FFC2D1', '#9DAE6B', '#FFB7C5', '#C8D6A1', '#E8B5C8'];

  // Confetti burst on first screen (body-fixed, brief)
  const conLayer = document.createElement('div');
  conLayer.id = '_cf';
  document.body.appendChild(conLayer);
  const conColors = ['#8A9A5B', '#F7CAC9', '#B8C58C', '#FADADD', '#FFC2D1', '#FFE2EC', '#A4B47A', '#FFFFFF'];
  for (let i = 0; i < 240; i++) {
    const p = document.createElement('span');
    p.className = '_cp';
    p.style.left = (Math.random() * 100) + '%';
    p.style.background = conColors[rand(0, conColors.length - 1)];
    p.style.width = (5 + Math.random() * 8) + 'px';
    p.style.height = (8 + Math.random() * 14) + 'px';
    p.style.animationDuration = (3.2 + Math.random() * 3.5) + 's';
    p.style.animationDelay = (Math.random() * 0.4) + 's';
    p.style.setProperty('--rot', (Math.random() * 1080 - 540) + 'deg');
    p.style.setProperty('--drift', ((Math.random() - 0.5) * 240) + 'px');
    conLayer.appendChild(p);
  }
  setTimeout(() => { if (conLayer && conLayer.parentNode) conLayer.remove(); }, 7500);

  // Page 2 — separate scene, multi-section vertical scroll OUTSIDE the OS
  const p2 = document.createElement('section');
  p2.id = '_p2';
  p2.innerHTML = `
    <div class="_bg2"></div>
    <div class="_hp"></div>
    <div class="_gifs"></div>
    <section class="_sec _sec1">
      <div class="_ov2">
        <div class="_oa"></div>
        <div class="_or"></div>
        <div class="_scrollHint">scroll ↓</div>
      </div>
    </section>
    <section class="_sec _sec2">
      <div class="_cat-bubble" aria-hidden="true">
        <span class="_tag">/// cat.thoughts</span>
        <div class="_content"></div>
      </div>
      <div class="_cat3d"></div>
    </section>
    <p class="_p2c">press <b>ESC</b> · change theme · toggle hack — return to amna_OS</p>
  `;
  document.body.appendChild(p2);

  // Hide OS chrome once user scrolls past first viewport (no clutter on p2)
  _S.onScroll = () => {
    if (!_S.on) return;
    const past = window.scrollY > window.innerHeight * 0.4;
    document.body.classList.toggle('_hxsc', past);
  };
  window.addEventListener('scroll', _S.onScroll, { passive: true });

  // Falling tiny ASCII cats inside p2
  const bg = p2.querySelector('._bg2');
  for (let i = 0; i < 140; i++) {
    const c = document.createElement('pre');
    c.className = '_fc';
    c.textContent = WHOAMI_ART;
    c.style.left = (Math.random() * 100) + '%';
    c.style.color = palette[rand(0, palette.length - 1)];
    c.style.opacity = (0.25 + Math.random() * 0.55).toFixed(2);
    c.style.animationDuration = (12 + Math.random() * 22) + 's';
    c.style.animationDelay = (-Math.random() * 25) + 's';
    c.style.setProperty('--scl', (0.12 + Math.random() * 0.3).toFixed(2));
    bg.appendChild(c);
  }

  // Floating hearts inside p2
  const hp = p2.querySelector('._hp');
  for (let i = 0; i < 60; i++) {
    const h = document.createElement('span');
    h.className = '_hh';
    h.textContent = ['♥','❤','♡','✿','❀','♥'][rand(0,5)];
    h.style.left = (Math.random()*100)+'%';
    h.style.fontSize = (12 + Math.random()*38)+'px';
    h.style.color = palette[rand(0, palette.length - 1)];
    h.style.animationDuration = (7 + Math.random()*12)+'s';
    h.style.animationDelay = (-Math.random()*12)+'s';
    hp.appendChild(h);
  }

  // Alien text — fixed centered, no drifting (only phrases swap)
  const ov = p2.querySelector('._ov2');
  const phr = [
    ['⟟ ⌰⟟⟒☍ ⊬⍜⎍ :☊', '(I liek you :c)'],
    ['⟟ ⋔⟟⊑ ⊬⍜⎍ :☊', '(I mih you :c)'],
    ['⟟ ⌰⍜⏚ ⊬⍜⎍ :☊', '(I lob you :c)'],
  ];
  let pi = 0;
  const swap = () => {
    const [a, t] = phr[pi];
    const oa = ov.querySelector('._oa');
    const or = ov.querySelector('._or');
    oa.classList.remove('_in'); or.classList.remove('_in');
    void oa.offsetWidth; void or.offsetWidth;
    oa.textContent = a;
    or.textContent = t;
    oa.classList.add('_in'); or.classList.add('_in');
    pi = (pi + 1) % phr.length;
  };
  swap();
  _S.swapInt = setInterval(swap, 3800);

  // Gifs — each used ONCE, medium size, gentle bounce inside p2
  const g = ['assets/alien-cat.gif','assets/alien-cat-alien-dog.gif','assets/giphy.gif','assets/glorp-cat.gif'];
  const gifs = p2.querySelector('._gifs');
  g.forEach((src, i) => {
    const im = document.createElement('img');
    im.src = src;
    im.className = '_gi';
    const x = 8 + i * 22 + Math.random() * 6;
    const y = 12 + (i % 2 === 0 ? 10 : 65) + Math.random() * 10;
    im.dataset.x = x;
    im.dataset.y = y;
    im.dataset.vx = ((Math.random() * 2 - 1) * 0.9).toFixed(3);
    im.dataset.vy = ((Math.random() * 2 - 1) * 0.9).toFixed(3);
    im.style.left = x + '%';
    im.style.top = y + '%';
    gifs.appendChild(im);
    _S.sprites.push(im);
  });

  // Loop — bounce gifs only, alien text only pulses softly
  const tick = () => {
    if (!_S.on) return;
    _S.t += 1;
    _S.sprites.forEach((im, i) => {
      let x = parseFloat(im.dataset.x);
      let y = parseFloat(im.dataset.y);
      let vx = parseFloat(im.dataset.vx);
      let vy = parseFloat(im.dataset.vy);
      x += vx * 0.32;
      y += vy * 0.32;
      if (x < 1) { x = 1; vx = -vx; }
      if (x > 86) { x = 86; vx = -vx; }
      if (y < 2) { y = 2; vy = -vy; }
      if (y > 84) { y = 84; vy = -vy; }
      im.dataset.x = x; im.dataset.y = y;
      im.dataset.vx = vx; im.dataset.vy = vy;
      im.style.left = x + '%';
      im.style.top = y + '%';
      const s = 0.95 + Math.sin(_S.t * 0.05 + i) * 0.08;
      im.style.transform = `scale(${s.toFixed(3)}) rotate(${(Math.sin(_S.t * 0.025 + i) * 6).toFixed(2)}deg)`;
    });
    _S.raf = requestAnimationFrame(tick);
  };
  tick();

  // 3D cat (FBX from local assets) — load three.js + FBXLoader via importmap
  _load3DCat(p2.querySelector('._cat3d'));

  // Audio: start at 17s with fade-in
  const a = new Audio('assets/Green Alien Singing Just The Two Of Us (Full Edition).mp3');
  a.volume = 0;
  a.loop = true;
  const startAt = () => {
    try { a.currentTime = 17; } catch(_) {}
    const p = a.play();
    if (p && p.catch) p.catch(() => {
      const wakeup = () => { a.play().catch(()=>{}); document.removeEventListener('click', wakeup); document.removeEventListener('keydown', wakeup); };
      document.addEventListener('click', wakeup, { once: true });
      document.addEventListener('keydown', wakeup, { once: true });
    });
  };
  if (a.readyState >= 1) startAt();
  else a.addEventListener('loadedmetadata', startAt, { once: true });
  a.load();
  _S.audio = a;
  let v = 0;
  _S.fadeInt = setInterval(() => {
    v = Math.min(1, v + 0.04);
    a.volume = v;
    if (v >= 1) { clearInterval(_S.fadeInt); _S.fadeInt = 0; }
  }, 110);

  // Lyric thought bubble — synced to audio, ASCII fallback in gaps
  _initBubble(p2.querySelector('._cat-bubble'), a);

  // Slow auto-scroll to second screen after confetti settles
  setTimeout(() => _slowScroll(window.innerHeight, 5500), 2200);
}

async function _initBubble(bubble, audio) {
  if (!bubble) return;
  const content = bubble.querySelector('._content');
  if (!content) return;

  // Parse lyrics.txt — alien lines with [m:ss] cues, grouped English in parens.
  // Each cue line: { cue: seconds, alien: 'text', english: '<group translation>' }
  let cues = [];
  try {
    const r = await fetch('assets/lyrics.txt', { cache: 'no-cache' });
    if (r.ok) {
      const txt = await r.text();
      const toSec = (mm, ss) => parseInt(mm, 10) * 60 + parseInt(ss, 10);
      let pendingEng = [];
      let groupStart = -1;
      let inEng = false;
      const closeGroup = () => {
        if (pendingEng.length && groupStart >= 0 && groupStart < cues.length) {
          const eng = pendingEng.join('\n').replace(/\)+\s*$/, '').trim();
          for (let i = groupStart; i < cues.length; i++) {
            if (!cues[i].english) cues[i].english = eng;
          }
        }
        pendingEng = [];
        groupStart = -1;
        inEng = false;
      };
      for (const raw of txt.split(/\r?\n/)) {
        const trimmed = raw.trim();
        if (!trimmed) { closeGroup(); continue; }
        if (/^(chorus|verse(\s*\d+)?|bridge|outro|intro|hook|pre[-\s]?chorus|refrain)$/i.test(trimmed)) {
          continue;
        }
        const cueMatch = trimmed.match(/^(.+?)\s*\[(\d+):(\d{2})\]\s*$/);
        if (cueMatch) {
          const alienText = cueMatch[1].trim();
          const cue = toSec(cueMatch[2], cueMatch[3]);
          if (groupStart < 0) groupStart = cues.length;
          cues.push({ cue, alien: alienText, english: '' });
          inEng = false;
          continue;
        }
        if (trimmed.startsWith('(') || inEng) {
          let e = trimmed.replace(/^\(+/, '');
          const endParen = /\)\s*$/.test(e);
          if (endParen) e = e.replace(/\)+\s*$/, '');
          if (e.trim()) pendingEng.push(e.trim());
          inEng = !endParen;
          continue;
        }
      }
      closeGroup();
      cues.sort((a, b) => a.cue - b.cue);
    }
  } catch (e) { /* fall through to art-only mode */ }

  // Compact alien-flavored ASCII art for "no lyric" gaps
  const MINI_ARTS = [
    '/\\_/\\\n( o.o )\n > ^ <',
    '✦ ⌒ . ⌒ ✦\n /\\___/\\\n(  ^_^  )\n  U   U',
    '☆.｡.:*\n ♡ meow ♡\n*.｡.:☆',
    '( •_•)\n(\\_/)\n( ⌐■_■)',
    '⊹ ✦ ⊹\n  /|_/|\n ( =ㅇᆽㅇ=)\n  >  ♡  <',
  ];
  // Larger reuse from terminal commands (compact-ish)
  const BIG_ARTS = [
    typeof WHOAMI_ART !== 'undefined' ? WHOAMI_ART : '',
    typeof AMNA_KITTY_ART !== 'undefined' ? AMNA_KITTY_ART : '',
    typeof NEKO_ART !== 'undefined' ? NEKO_ART : '',
  ].filter(Boolean);

  let mode = '', curKey = '';
  const swap = (key, html) => {
    if (curKey === key) return;
    curKey = key;
    bubble.classList.add('_on');
    if (typeof gsap !== 'undefined') {
      gsap.to(content, {
        opacity: 0, y: -6, duration: 0.18, ease: 'power2.in',
        onComplete: () => {
          content.innerHTML = html;
          gsap.fromTo(content, { opacity: 0, y: 8, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: 'back.out(1.4)' });
        }
      });
    } else {
      content.classList.add('_fade');
      setTimeout(() => {
        content.innerHTML = html;
        content.classList.remove('_fade');
      }, 160);
    }
  };
  const setBlock = (b, idx) => {
    mode = 'lyric';
    const a = b.alien ? `<span class="_lyric">${escapeHtml(b.alien)}</span>` : '';
    const e = b.english ? `<span class="_eng">[ ${escapeHtml(b.english)} ]</span>` : '';
    swap('B:' + idx, a + e);
  };
  const setMini = (i) => {
    mode = 'mini';
    swap('M:' + i, `<pre class="_art _mini">${escapeHtml(MINI_ARTS[i % MINI_ARTS.length])}</pre>`);
  };
  const setBig = (i) => {
    mode = 'big';
    swap('B2:' + i, `<pre class="_art">${escapeHtml(BIG_ARTS[i % BIG_ARTS.length])}</pre>`);
  };

  let artIdx = 0;
  setMini(0);

  _S.bubbleArt = setInterval(() => {
    if (!_S.on) return;
    if (mode === 'mini' || mode === 'big') {
      artIdx++;
      if (artIdx % 4 === 3 && BIG_ARTS.length) setBig(Math.floor(artIdx / 4));
      else setMini(artIdx);
    }
  }, 4200);

  const intro = 17;
  const tail = 1.5;
  const onUpdate = () => {
    if (!_S.on) return;
    const dur = audio.duration;
    if (!blocks.length || !isFinite(dur) || dur <= intro + 2) {
      if (mode !== 'mini' && mode !== 'big') setMini(artIdx);
      return;
    }
    const t = audio.currentTime;
    if (t < intro - 0.2 || t > dur - 0.4) {
      if (mode !== 'mini' && mode !== 'big') setMini(artIdx);
      return;
    }
    const span = dur - intro - tail;
    if (span <= 0) return;
    const per = span / blocks.length;
    const idx = Math.floor((t - intro) / per);
    if (idx < 0 || idx >= blocks.length) {
      if (mode !== 'mini' && mode !== 'big') setMini(artIdx);
      return;
    }
    setBlock(blocks[idx], idx);
  };
  audio.addEventListener('timeupdate', onUpdate);
  audio.addEventListener('loadedmetadata', onUpdate);
  _S.bubbleAudioListener = onUpdate;
  _S.bubbleAudio = audio;
}

function _slowScroll(targetY, duration) {
  const startY = window.scrollY;
  const dist = targetY - startY;
  const t0 = performance.now();
  const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const step = (now) => {
    if (!_S.on) return;
    const t = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, startY + dist * ease(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

async function _load3DCat(container) {
  if (!container) return;
  try {
    const THREE = await import('three');
    const { FBXLoader } = await import('three/addons/loaders/FBXLoader.js');
    const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

    const w = () => container.clientWidth || 600;
    const h = () => container.clientHeight || 500;
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(38, w() / h(), 0.1, 4000);
    camera.position.set(0, 80, 320);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w(), h());
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(renderer.domElement,
        { scale: 0.55, opacity: 0, rotation: -6 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.4, ease: 'elastic.out(1, 0.55)', delay: 0.4, transformOrigin: '50% 60%' }
      );
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 120;
    controls.maxDistance = 800;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xfff0e0, 1.5);
    key.position.set(60, 120, 80); scene.add(key);
    const fill = new THREE.DirectionalLight(0xF7CAC9, 0.8);
    fill.position.set(-80, 30, -40); scene.add(fill);
    const rim = new THREE.DirectionalLight(0x8A9A5B, 0.9);
    rim.position.set(0, 60, -100); scene.add(rim);

    const dir = 'assets/space-cat/model/';
    const tex = new THREE.TextureLoader();
    const sRGB = (t) => { t.colorSpace = THREE.SRGBColorSpace; return t; };

    const bodyMat = new THREE.MeshStandardMaterial({
      map: sRGB(tex.load(dir + 'body_albedo.jpg')),
      normalMap: tex.load(dir + 'body_normal.png'),
      roughnessMap: tex.load(dir + 'body_roughness.jpg'),
      metalnessMap: tex.load(dir + 'body_metallic.jpg'),
      emissiveMap: sRGB(tex.load(dir + 'body_emissive.jpg')),
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.85,
      metalness: 1.0,
      roughness: 0.55,
    });
    const glassMat = new THREE.MeshStandardMaterial({
      map: sRGB(tex.load(dir + 'glass_albedo.jpg')),
      roughnessMap: tex.load(dir + 'glass_roughness.jpg'),
      emissiveMap: sRGB(tex.load(dir + 'glass_emissive.jpg')),
      alphaMap: tex.load(dir + 'glass_opacity.jpg'),
      emissive: new THREE.Color(0x88ccff),
      emissiveIntensity: 0.9,
      metalness: 0.4,
      roughness: 0.25,
      transparent: true,
      opacity: 0.92,
      side: THREE.DoubleSide,
    });

    const loader = new FBXLoader();
    loader.load(
      'assets/space-cat/model/cat%20alien.fbx',
      (obj) => {
        if (!_S.on) return;
        const box = new THREE.Box3().setFromObject(obj);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const target = 280;
        const s = target / maxDim;
        obj.scale.setScalar(s);

        const box2 = new THREE.Box3().setFromObject(obj);
        const c2 = box2.getCenter(new THREE.Vector3());
        obj.position.sub(c2);

        obj.traverse((child) => {
          if (!child.isMesh) return;
          const matName = (child.material && child.material.name || '').toLowerCase();
          const meshName = (child.name || '').toLowerCase();
          if (matName.includes('glass') || meshName.includes('glass') || meshName.includes('helmet') || meshName.includes('visor')) {
            child.material = glassMat;
          } else {
            child.material = bodyMat;
          }
        });

        scene.add(obj);

        // Frame camera to fit model — tighter for bigger presence
        const fitDist = (target * 1.25) / (2 * Math.tan((camera.fov * Math.PI / 180) / 2));
        camera.position.set(0, 50, fitDist);
        controls.target.set(0, 0, 0);
        controls.minDistance = 80;
        controls.update();

        let mixer = null;
        if (obj.animations && obj.animations.length) {
          mixer = new THREE.AnimationMixer(obj);
          mixer.clipAction(obj.animations[0]).play();
        }

        const clock = new THREE.Clock();
        const renderLoop = () => {
          if (!_S.on) return;
          const dt = clock.getDelta();
          if (mixer) mixer.update(dt);
          controls.update();
          obj.position.y = Math.sin(clock.getElapsedTime() * 1.2) * 3;
          renderer.render(scene, camera);
          _S.three.raf = requestAnimationFrame(renderLoop);
        };

        const onResize = () => {
          const W = w(), H = h();
          camera.aspect = W / H;
          camera.updateProjectionMatrix();
          renderer.setSize(W, H);
        };
        window.addEventListener('resize', onResize);

        _S.three = { renderer, scene, camera, mixer, controls, raf: 0, onResize };
        renderLoop();
      },
      undefined,
      (err) => {
        console.warn('FBX load failed', err);
        const msg = document.createElement('div');
        msg.style.cssText = 'color:#8A9A5B;font-family:monospace;text-align:center;padding:20px;';
        msg.textContent = '✦ alien cat napping ✦';
        container.appendChild(msg);
      }
    );
  } catch (e) {
    console.warn('three.js bootstrap failed', e);
  }
}

function _qZ() {
  if (!_S.on) return;
  _S.on = false;
  if (_S.raf) cancelAnimationFrame(_S.raf);
  if (_S.swapInt) clearInterval(_S.swapInt);
  if (_S.fadeInt) clearInterval(_S.fadeInt);
  if (_S.bubbleArt) { clearInterval(_S.bubbleArt); _S.bubbleArt = 0; }
  if (_S.bubbleAudio && _S.bubbleAudioListener) {
    try { _S.bubbleAudio.removeEventListener('timeupdate', _S.bubbleAudioListener); } catch(_){}
    try { _S.bubbleAudio.removeEventListener('loadedmetadata', _S.bubbleAudioListener); } catch(_){}
  }
  _S.bubbleAudio = null; _S.bubbleAudioListener = null;
  if (_S.audio) {
    const a = _S.audio;
    let v = a.volume;
    const id = setInterval(() => {
      v = Math.max(0, v - 0.06);
      a.volume = v;
      if (v <= 0) { clearInterval(id); try { a.pause(); } catch(_){} }
    }, 80);
    _S.audio = null;
  }
  if (_S.three) {
    if (_S.three.raf) cancelAnimationFrame(_S.three.raf);
    if (_S.three.controls) try { _S.three.controls.dispose(); } catch(_){}
    if (_S.three.onResize) window.removeEventListener('resize', _S.three.onResize);
    if (_S.three.renderer) {
      try { _S.three.renderer.dispose(); } catch(_){}
      const dom = _S.three.renderer.domElement;
      if (dom && dom.parentNode) dom.parentNode.removeChild(dom);
    }
    _S.three = null;
  }
  if (_S.onScroll) { window.removeEventListener('scroll', _S.onScroll); _S.onScroll = null; }
  ['_cf','_p2'].forEach(id => { const n = document.getElementById(id); if (n) n.remove(); });
  _S.sprites = [];
  document.documentElement.classList.remove('hx-on');
  document.body.classList.remove('hx-on');
  document.body.classList.remove('_hxsc');
  const t = _S.savedTheme && _S.savedTheme !== 'pink' ? _S.savedTheme : (localStorage.getItem('amna-theme') || 'dark');
  setTheme(t);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --------------------------------------------
// Wire-up
// --------------------------------------------
function init() {
  // theme
  setTheme(localStorage.getItem('amna-theme') || 'dark');
  $('#theme-toggle').addEventListener('click', toggleTheme);
  $('#hack-toggle').addEventListener('click', () => {
    const on = !document.body.classList.contains('hack');
    if (on && document.documentElement.getAttribute('data-theme') !== 'dark') setTheme('dark');
    setHack(on);
  });

  // clock
  const tickClock = () => {
    const d = new Date();
    $('#clock').textContent = d.toTimeString().slice(0, 8);
  };
  tickClock(); setInterval(tickClock, 1000);

  // topbar links
  $$('.topbar-link').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      $$('.topbar-link').forEach(x => x.classList.remove('active'));
      a.classList.add('active');
      const f = a.dataset.focus;
      if (f === 'desktop') {
        // minimize all
        $$('.win').forEach(w => { if (w.style.display !== 'none') minimizeWindow(w.dataset.app); });
      } else openWindow(f);
    });
  });

  // sidebar
  $$('.rail-btn').forEach((b) => {
    b.addEventListener('click', () => {
      const r = b.dataset.rail;
      if (r === 'logs') {
        openWindow('terminal');
        termLine('<span class="accent">═══ amna_OS // CHANGELOG.md ═══</span>');
        CHANGELOG.forEach((entry) => {
          termLine(`<span class="ok">v${escapeHtml(entry.version)}</span> <span class="muted">— ${escapeHtml(entry.date)}</span>`);
          entry.changes.forEach((c) => termLine(`  <span class="accent">+</span> <span class="muted">${escapeHtml(c)}</span>`));
          termLine('');
        });
        termLine('<span class="muted">end of log. type `clear` to wipe.</span>');
        return;
      }
      openWindow(r);
    });
  });

  // desktop icons — drag + open on click
  $$('.d-icon').forEach((icon) => {
    makeDraggable(icon, icon, { icon: true });
    icon.addEventListener('click', (e) => {
      if (icon._lastDragMoved) { icon._lastDragMoved = false; return; }
      openWindow(icon.dataset.app);
    });
  });
  restoreIconPos();

  // window controls + dragging
  $$('.win').forEach((win) => {
    const title = win.querySelector('.win-title');
    makeDraggable(win, title);
    win.addEventListener('mousedown', () => bringToFront(win));
    win.querySelectorAll('[data-win-action]').forEach((b) => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        const act = b.dataset.winAction;
        if (act === 'close') closeWindow(win.dataset.app);
        else if (act === 'min') minimizeWindow(win.dataset.app);
        else if (act === 'max') maxToggle(win);
      });
    });
  });

  // vault back btn
  $('[data-vault-back]').addEventListener('click', () => renderVault());

  // bio actions
  $$('.bio-actions .btn').forEach((b) => {
    b.addEventListener('click', () => {
      if (b.dataset.action === 'open-vault') openWindow('vault');
      if (b.dataset.action === 'contact') {
        openWindow('terminal');
        termLine('<span class="ok">> contact.bat executing...</span>');
        termLine('<span class="muted">EMAIL    : </span><span class="accent">amnamahmood008@gmail.com</span>');
        termLine('<span class="muted">GITHUB   : </span><span class="accent">github.com/amna0x</span>');
        termLine('<span class="muted">LOCATION : </span><span class="accent">DI Khan, PK</span>');
        termLine('<span class="ok">> ready to mail. copy email above.</span>');
        try { window.location.href = 'mailto:amnamahmood008@gmail.com'; } catch (e) {}
      }
    });
  });

  // bio skill bars: set --fill from data attr
  $$('.bar').forEach((b) => b.style.setProperty('--fill', b.dataset.fill || 5));

  // SIEM controls
  $('#siem-pause').addEventListener('click', () => {
    state.siemPaused = !state.siemPaused;
    $('#siem-pause').textContent = state.siemPaused ? 'resume' : 'pause';
  });

  // Global ESC = stop all fx
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { stopAllFx(); _qZ(); }
  });

  // terminal input
  const input = $('#term-input');
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      runCommand(input.value);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (state.history.length === 0) return;
      state.histIdx = Math.min(state.histIdx + 1, state.history.length - 1);
      input.value = state.history[state.histIdx] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      state.histIdx = Math.max(state.histIdx - 1, -1);
      input.value = state.histIdx === -1 ? '' : state.history[state.histIdx];
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault(); termClear();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.value.toLowerCase();
      const opts = Object.keys(COMMANDS).filter(c => c.startsWith(partial));
      if (opts.length === 1) input.value = opts[0];
      else if (opts.length > 1) termLine(`<span class="muted">${opts.join('  ')}</span>`);
    }
  });
  $('#win-terminal').addEventListener('click', (e) => {
    if (e.target.closest('.win-btn,.win-title')) return;
    input.focus();
  });

  // boot
  boot();
}

document.addEventListener('DOMContentLoaded', init);
