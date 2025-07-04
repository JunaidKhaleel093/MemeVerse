import { create } from 'zustand';

const mockMemes = [
  {
  id: '1',
  title: 'When Kafka Hibino transforms but still has to do paperwork',
  imageUrl: 'https://images8.alphacoders.com/136/thumb-440-1361048.webp',
  creator: 'Junaid Khaleel',
  createdAt: '2025-02-26T10:30:00Z',
  likes: 3,
  comments: [
    { id: 'c1', user: 'ViceCaptainNerf', text: 'Bro really said "Kaiju mode, but responsibly."', createdAt: '2025-02-26T11:30:00Z' },
    { id: 'c2', user: 'MonsterHunter', text: 'Imagine being OP but still stuck doing reports.', createdAt: '2025-02-26T12:45:00Z' }
  ],
  tags: ['kaiju no.8', 'kafka hibino', 'squad 3'],
  isLiked: false
},
{
  id: '2',
  title: 'When Luffy says “Im gonna be the Pirate King” for the 1000th time',
  imageUrl: 'https://images6.alphacoders.com/135/thumbbig-1358564.webp',
  creator: 'Junaid Khaleel',
  createdAt: '2025-02-26T14:00:00Z',
  likes: 5,
  comments: [
    { id: 'c3', user: 'ZoroTheLost', text: 'And I still believe him!', createdAt: '2025-02-26T14:30:00Z' },
    { id: 'c4', user: 'SanjiSimp', text: 'Bro has that main character energy!', createdAt: '2025-02-26T15:00:00Z' }
  ],
  tags: ['one piece', 'luffy', 'pirate king'],
  isLiked: false
},
{
  id: '3',
  title: 'When Goku asks “Can we fight now?”',
  imageUrl: 'https://images7.alphacoders.com/134/thumb-440-1349255.webp',
  creator: 'Junaid Khaleel',
  createdAt: '2025-02-26T09:15:00Z',
  likes: 3,
  comments: [
    { id: 'c5', user: 'VegetaPride', text: 'This guy never rests...', createdAt: '2025-02-26T09:45:00Z' },
    { id: 'c6', user: 'KrillinF', text: 'I’m out, not again!', createdAt: '2025-02-26T10:00:00Z' }
  ],
  tags: ['dragon ball', 'goku', 'saiyan'],
  isLiked: false
},
{
  id: '4',
  title: 'When Gojo removes his blindfold and smirks',
  imageUrl: 'https://images5.alphacoders.com/113/thumb-440-1134110.webp',
  creator: 'Junaid Khaleel',
  createdAt: '2025-02-26T10:30:00Z',
  likes: 8,
  comments: [
    { id: 'c7', user: 'SukunaLaughs', text: 'Somebody is about to die.', createdAt: '2025-02-26T11:30:00Z' },
    { id: 'c8', user: 'ItadoriKicks', text: 'Dude is way too OP!', createdAt: '2025-02-26T12:45:00Z' }
  ],
  tags: ['jujutsu kaisen', 'gojo', 'op'],
  isLiked: false
},
{
  id: '5',
  title: 'When Sung Jin-Woo says “Arise”',
  imageUrl: 'https://images.alphacoders.com/109/thumb-440-1093511.webp',
  creator: 'Junaid Khaleel',
  createdAt: '2025-02-26T12:00:00Z',
  likes: 9,
  comments: [
    { id: 'c9', user: 'HunterGuild', text: 'Another army joins the squad!', createdAt: '2025-02-26T12:30:00Z' },
    { id: 'c10', user: 'SystemMessage', text: 'Your level has increased!', createdAt: '2025-02-26T13:00:00Z' }
  ],
  tags: ['solo leveling', 'sung jin-woo', 'arise'],
  isLiked: false
},
{
  id: '6',
  title: 'When Okarun sees Momo in trouble',
  imageUrl: 'https://images.alphacoders.com/138/thumb-440-1382324.webp',
  creator: 'Junaid Khaleel',
  createdAt: '2025-02-26T16:45:00Z',
  likes: 4,
  comments: [
    { id: 'c11', user: 'AlienFan', text: 'Dude just turned into a beast!', createdAt: '2025-02-26T17:00:00Z' },
    { id: 'c12', user: 'GhostHunter', text: 'Turbo mode activated!', createdAt: '2025-02-26T17:30:00Z' }
  ],
  tags: ['dandadan', 'okarun', 'momo'],
  isLiked: false
},
{
  id: '7',
  title: 'When Kafka Hibino transforms but still has to do paperwork',
  imageUrl: 'https://images8.alphacoders.com/136/thumb-440-1361048.webp',
  creator: 'Junaid Khaleel',
  createdAt: '2025-02-26T10:30:00Z',
  likes: 3,
  comments: [
    { id: 'c1', user: 'ViceCaptainNerf', text: 'Bro really said "Kaiju mode, but responsibly."', createdAt: '2025-02-26T11:30:00Z' },
    { id: 'c2', user: 'MonsterHunter', text: 'Imagine being OP but still stuck doing reports.', createdAt: '2025-02-26T12:45:00Z' }
  ],
  tags: ['kaiju no.8', 'kafka hibino', 'squad 3'],
  isLiked: false
},
{
  id: '8',
  title: 'When Luffy says “Im gonna be the Pirate King” for the 1000th time',
  imageUrl: 'https://images6.alphacoders.com/135/thumbbig-1358564.webp',
  creator: 'Junaid Khaleel',
  createdAt: '2025-02-26T14:00:00Z',
  likes: 5,
  comments: [
    { id: 'c3', user: 'ZoroTheLost', text: 'And I still believe him!', createdAt: '2025-02-26T14:30:00Z' },
    { id: 'c4', user: 'SanjiSimp', text: 'Bro has that main character energy!', createdAt: '2025-02-26T15:00:00Z' }
  ],
  tags: ['one piece', 'luffy', 'pirate king'],
  isLiked: false
},
{
  id: '9',
  title: 'When Goku asks “Can we fight now?”',
  imageUrl: 'https://images7.alphacoders.com/134/thumb-440-1349255.webp',
  creator: 'Junaid Khaleel',
  createdAt: '2025-02-26T09:15:00Z',
  likes: 3,
  comments: [
    { id: 'c5', user: 'VegetaPride', text: 'This guy never rests...', createdAt: '2025-02-26T09:45:00Z' },
    { id: 'c6', user: 'KrillinF', text: 'I’m out, not again!', createdAt: '2025-02-26T10:00:00Z' }
  ],
  tags: ['dragon ball', 'goku', 'saiyan'],
  isLiked: false
},
{
  id: '10',
  title: 'When Anya uses her telepathy to cheat on a test',
  imageUrl: 'https://images8.alphacoders.com/137/thumb-440-1371304.webp',
  creator: 'Junaid Khaleel',
  createdAt: '2025-02-26T11:00:00Z',
  likes: 8,
  comments: [
    { id: 'c13', user: 'LoidSimp', text: 'Anya forger, the genius strategist.', createdAt: '2025-02-26T11:30:00Z' },
    { id: 'c14', user: 'YorFan', text: 'I bet Loid doesn’t even know.', createdAt: '2025-02-26T12:00:00Z' }
  ],
  tags: ['spy x family', 'anya', 'telepathy'],
  isLiked: false
},
{
  id: '11',
  title: 'When Denji finally touches some “oppai”',
  imageUrl: 'https://images2.alphacoders.com/133/thumb-440-1335818.webp',
  creator: 'Junaid Khaleel',
  createdAt: '2025-02-26T15:00:00Z',
  likes: 9,
  comments: [
    { id: 'c15', user: 'PowerRules', text: 'Mission accomplished, but at what cost?', createdAt: '2025-02-26T15:30:00Z' },
    { id: 'c16', user: 'MakimaWorshipper', text: 'Denji’s ultimate dream!', createdAt: '2025-02-26T16:00:00Z' }
  ],
  tags: ['chainsaw man', 'denji', 'makima'],
  isLiked: false
},
{
  id: '12',
  title: 'When Ayanokoji wins without even trying',
  imageUrl: 'https://picfiles.alphacoders.com/543/thumb-1920-543548.png',
  creator: 'Junaid Khaleel',
  createdAt: '2025-02-26T18:00:00Z',
  likes: 8,
  comments: [
    { id: 'c17', user: 'ClassDLeader', text: 'Dude is too calculated.', createdAt: '2025-02-26T18:30:00Z' },
    { id: 'c18', user: 'StrategyKing', text: 'Never underestimate the quiet ones.', createdAt: '2025-02-26T19:00:00Z' }
  ],
  tags: ['classroom of the elite', 'ayanokoji', 'genius'],
  isLiked: false
}
 
];

const trendingMemes = [
  {
    id: 't1',
    title: 'When Lelouch commands “Obey me”',
    imageUrl: 'https://images3.alphacoders.com/135/thumb-440-1358483.webp',
    creator: 'Junaid Khaleel',
    createdAt: '2025-02-26T14:00:00Z',
    likes: 9,
    comments: [
      { id: 'ct1', user: 'SuzakuKnight', text: 'Geass power is too broken!', createdAt: '2025-02-26T14:30:00Z' }
    ],
    tags: ['code geass', 'lelouch', 'geass'],
    isLiked: false
  },
  {
    id: 't2',
    title: 'When Eren shouts “Tatakai”',
    imageUrl: 'https://images7.alphacoders.com/133/thumb-440-1339712.webp',
    creator: 'Junaid Khaleel',
    createdAt: '2025-02-26T12:45:00Z',
    likes: 11,
    comments: [
      { id: 'ct2', user: 'SurveyCorps', text: 'Eren on another level.', createdAt: '2025-02-26T13:00:00Z' }
    ],
    tags: ['attack on titan', 'eren', 'tatakai'],
    isLiked: false
  },
  {
    id: 't3',
    title: 'When Saitama wins with one punch',
    imageUrl: 'https://images6.alphacoders.com/135/thumb-440-1358885.webp',
    creator: 'Junaid Khaleel',
    createdAt: '2025-02-26T10:15:00Z',
    likes: 8,
    comments: [
      { id: 'ct3', user: 'GenosDisciple', text: 'This guy needs a real challenge!', createdAt: '2025-02-26T10:30:00Z' }
    ],
    tags: ['one punch man', 'saitama', 'opm'],
    isLiked: false
  },
  {
    id: 't4',
    title: 'When Goku goes Ultra Instinct',
    imageUrl: 'https://images8.alphacoders.com/134/thumb-440-1348647.webp',
    creator: 'Junaid Khaleel',
    createdAt: '2025-02-26T09:30:00Z',
    likes: 1,
    comments: [
      { id: 'ct4', user: 'VegetaPride', text: 'Kakarot surpassing limits again!', createdAt: '2025-02-26T09:45:00Z' }
    ],
    tags: ['dragon ball', 'goku', 'ultra instinct'],
    isLiked: false
  },
  {
    id: 't5',
    title: 'When L says “I am justice”',
    imageUrl: 'https://images3.alphacoders.com/153/thumb-440-153245.webp',
    creator: 'Junaid Khaleel',
    createdAt: '2025-02-26T18:20:00Z',
    likes: 7,
    comments: [
      { id: 'ct5', user: 'ShinigamiEyes', text: 'L is the real genius here.', createdAt: '2025-02-26T18:40:00Z' }
    ],
    tags: ['death note', 'L', 'justice'],
    isLiked: false
  },
  {
    id: 't6',
    title: 'When Naruto uses Rasengan',
    imageUrl: 'https://images3.alphacoders.com/644/thumb-440-644185.webp',
    creator: 'Junaid Khaleel',
    createdAt: '2025-02-26T15:00:00Z',
    likes: 9,
    comments: [
      { id: 'ct6', user: 'SasukeRival', text: 'Classic Naruto move!', createdAt: '2025-02-26T15:20:00Z' }
    ],
    tags: ['naruto', 'rasengan', 'hokage'],
    isLiked: false
  },
  {
    id: 't7',
    title: 'When Tanjiro sniffs out a demon',
    imageUrl: 'https://images8.alphacoders.com/133/thumb-440-1331191.webp',
    creator: 'Junaid Khaleel',
    createdAt: '2025-02-26T08:10:00Z',
    likes: 8,
    comments: [
      { id: 'ct7', user: 'NezukoKick', text: 'Tanjiro always on point!', createdAt: '2025-02-26T08:30:00Z' }
    ],
    tags: ['demon slayer', 'tanjiro', 'breathing styles'],
    isLiked: false
  },
  {
    id: 't8',
    title: 'When Gojo takes off his blindfold',
    imageUrl: 'https://images8.alphacoders.com/133/thumb-440-1331367.webp',
    creator: 'Junaid Khaleel',
    createdAt: '2025-02-26T11:45:00Z',
    likes: 1,
    comments: [
      { id: 'ct8', user: 'JujutsuKing', text: 'The strongest sorcerer is here!', createdAt: '2025-02-26T12:00:00Z' }
    ],
    tags: ['jujutsu kaisen', 'gojo', 'six eyes'],
    isLiked: false
  },
  {
    id: 't9',
    title: 'When Light Yagami writes a name',
    imageUrl: 'https://images2.alphacoders.com/727/thumb-440-727991.webp',
    creator: 'Junaid Khaleel',
    createdAt: '2025-02-26T17:10:00Z',
    likes: 8,
    comments: [
      { id: 'ct9', user: 'NotebookHolder', text: 'He always has a plan.', createdAt: '2025-02-26T17:30:00Z' }
    ],
    tags: ['death note', 'light yagami', 'kira'],
    isLiked: false
  },
  {
    id: 't10',
    title: 'When Zoro says he won’t lose again',
    imageUrl: 'https://images5.alphacoders.com/132/thumb-440-1325614.webp',
    creator: 'Junaid Khaleel',
    createdAt: '2025-02-26T20:00:00Z',
    likes: 12,
    comments: [
      { id: 'ct10', user: 'SanjiKicks', text: 'Zoro keeps his word.', createdAt: '2025-02-26T20:15:00Z' }
    ],
    tags: ['one piece', 'zoro', 'swordsman'],
    isLiked: false
  },
  {
    id: 't11',
    title: 'When Itachi activates Mangekyo Sharingan',
    imageUrl: 'https://images6.alphacoders.com/137/thumb-440-1371177.webp',
    creator: 'Junaid Khaleel',
    createdAt: '2025-02-26T16:40:00Z',
    likes: 13,
    comments: [
      { id: 'ct11', user: 'KonohaGhost', text: 'Itachi is just built different.', createdAt: '2025-02-26T16:55:00Z' }
    ],
    tags: ['naruto', 'itachi', 'sharingan'],
    isLiked: false
  },
  {
    id: 't12',
    title: 'When Aizen says “All according to plan”',
    imageUrl: 'https://images7.alphacoders.com/135/thumb-440-1359295.webp',
    creator: 'Junaid Khaleel',
    createdAt: '2025-02-26T14:20:00Z',
    likes: 9,
    comments: [
      { id: 'ct12', user: 'SoulSociety', text: 'Aizen always 10 steps ahead.', createdAt: '2025-02-26T14:40:00Z' }
    ],
    tags: ['bleach', 'aizen', 'hogyoku'],
    isLiked: false
  }
];

const MEMES_KEY = 'memeverse_memes';
function getSavedMemes() {
  const stored = localStorage.getItem(MEMES_KEY);
  if (stored) return JSON.parse(stored);
  return mockMemes;
}
function saveMemes(memes) {
  localStorage.setItem(MEMES_KEY, JSON.stringify(memes));
}

export const useMemeStore = create((set, get) => ({
  memes: getSavedMemes(),
  trendingMemes: trendingMemes,
  filteredMemes: getSavedMemes(),
  currentMeme: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  activeTag: null,

  fetchMemes: async () => {
    set({ isLoading: true, error: null });
    try {
      setTimeout(() => {
        const memes = getSavedMemes();
        set({
          memes,
          filteredMemes: memes,
          trendingMemes: trendingMemes,
          isLoading: false
        });
      }, 800);
    } catch {
      set({ error: 'Failed to fetch memes', isLoading: false });
    }
  },

  uploadMeme: async (meme) => {
    set({ isLoading: true, error: null });
    try {
      setTimeout(() => {
        const memes = getSavedMemes();
        const newMeme = {
          ...meme,
          id: `${Date.now()}`,
          createdAt: new Date().toISOString(),
          likes: 0,
          comments: [],
          isLiked: false
        };
        const updatedMemes = [newMeme, ...memes];
        saveMemes(updatedMemes);
        set({
          memes: updatedMemes,
          filteredMemes: updatedMemes,
          isLoading: false
        });
      }, 800);
    } catch {
      set({ error: 'Failed to upload meme', isLoading: false });
    }
  },

  likeMeme: (id) => {
    set((state) => {
      // Track likes per user in localStorage
      const userKey = 'memeverse_likes';
      const currentUser = JSON.parse(localStorage.getItem('memeverse_auth'));
      let liked = JSON.parse(localStorage.getItem(userKey) || '{}');
      const userId = currentUser?.id || 'guest';
      if (!liked[userId]) liked[userId] = [];
      if (!liked[userId].includes(id)) {
        liked[userId].push(id);
        localStorage.setItem(userKey, JSON.stringify(liked));
        const updatedMemes = state.memes.map((meme) =>
          meme.id === id ? { ...meme, likes: meme.likes + 1, isLiked: true } : meme
        );
        saveMemes(updatedMemes);
        return { memes: updatedMemes };
      }
      return {};
    });
  },

  unlikeMeme: (id) => {
    set((state) => {
      const userKey = 'memeverse_likes';
      const currentUser = JSON.parse(localStorage.getItem('memeverse_auth'));
      let liked = JSON.parse(localStorage.getItem(userKey) || '{}');
      const userId = currentUser?.id || 'guest';
      if (liked[userId] && liked[userId].includes(id)) {
        liked[userId] = liked[userId].filter((memeId) => memeId !== id);
        localStorage.setItem(userKey, JSON.stringify(liked));
        const updatedMemes = state.memes.map((meme) =>
          meme.id === id ? { ...meme, likes: Math.max(0, meme.likes - 1), isLiked: false } : meme
        );
        saveMemes(updatedMemes);
        return { memes: updatedMemes };
      }
      return {};
    });
  },

  searchMemes: (query) => {
    set((state) => {
      const searchQuery = query.toLowerCase();
      let filtered = state.memes.filter((meme) =>
        meme.title.toLowerCase().includes(searchQuery) || meme.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
      );
      return { searchQuery, filteredMemes: filtered };
    });
  },

  filterByTag: (tag) => {
    set((state) => {
      let filtered = tag ? state.memes.filter((meme) => meme.tags.includes(tag)) : state.memes;
      return { activeTag: tag, filteredMemes: filtered };
    });
  }
}));
