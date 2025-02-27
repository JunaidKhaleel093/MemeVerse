import React, { useEffect, useState } from 'react';
import { TrendingUp, Flame } from 'lucide-react';
import MemeGrid from '../components/meme/MemeGrid';
import Loader from '../components/ui/Loader';

const trendingMemesData = [
  {
    id: 't1',
    title: 'When Lelouch commands “Obey me”',
    imageUrl: 'https://images3.alphacoders.com/135/thumb-440-1358483.webp',
    creator: 'ZeroRebellion',
    createdAt: '2023-06-01T14:00:00Z',
    likes: 9200,
    comments: [
      { id: 'ct1', user: 'SuzakuKnight', text: 'Geass power is too broken!', createdAt: '2023-06-01T14:30:00Z' }
    ],
    tags: ['code geass', 'lelouch', 'geass'],
    isLiked: false
  },
  {
    id: 't2',
    title: 'When Eren shouts “Tatakai”',
    imageUrl: 'https://images7.alphacoders.com/133/thumb-440-1339712.webp',
    creator: 'Yeagerist',
    createdAt: '2023-07-12T12:45:00Z',
    likes: 11000,
    comments: [
      { id: 'ct2', user: 'SurveyCorps', text: 'Eren on another level.', createdAt: '2023-07-12T13:00:00Z' }
    ],
    tags: ['attack on titan', 'eren', 'tatakai'],
    isLiked: false
  },
  {
    id: 't3',
    title: 'When Saitama wins with one punch',
    imageUrl: 'https://images6.alphacoders.com/135/thumb-440-1358885.webp',
    creator: 'OnePunchFan',
    createdAt: '2023-08-22T10:15:00Z',
    likes: 8500,
    comments: [
      { id: 'ct3', user: 'GenosDisciple', text: 'This guy needs a real challenge!', createdAt: '2023-08-22T10:30:00Z' }
    ],
    tags: ['one punch man', 'saitama', 'opm'],
    isLiked: false
  },
  {
    id: 't4',
    title: 'When Goku goes Ultra Instinct',
    imageUrl: 'https://images8.alphacoders.com/134/thumb-440-1348647.webp',
    creator: 'SaiyanLegend',
    createdAt: '2023-09-10T09:30:00Z',
    likes: 13000,
    comments: [
      { id: 'ct4', user: 'VegetaPride', text: 'Kakarot surpassing limits again!', createdAt: '2023-09-10T09:45:00Z' }
    ],
    tags: ['dragon ball', 'goku', 'ultra instinct'],
    isLiked: false
  },
  {
    id: 't5',
    title: 'When L says “I am justice”',
    imageUrl: 'https://images3.alphacoders.com/153/thumb-440-153245.webp',
    creator: 'KiraHunter',
    createdAt: '2023-10-05T18:20:00Z',
    likes: 7200,
    comments: [
      { id: 'ct5', user: 'ShinigamiEyes', text: 'L is the real genius here.', createdAt: '2023-10-05T18:40:00Z' }
    ],
    tags: ['death note', 'L', 'justice'],
    isLiked: false
  },
  {
    id: 't6',
    title: 'When Naruto uses Rasengan',
    imageUrl: 'https://images3.alphacoders.com/644/thumb-440-644185.webp',
    creator: 'HokageDream',
    createdAt: '2023-11-15T15:00:00Z',
    likes: 9500,
    comments: [
      { id: 'ct6', user: 'SasukeRival', text: 'Classic Naruto move!', createdAt: '2023-11-15T15:20:00Z' }
    ],
    tags: ['naruto', 'rasengan', 'hokage'],
    isLiked: false
  },
  {
    id: 't7',
    title: 'When Tanjiro sniffs out a demon',
    imageUrl: 'https://images8.alphacoders.com/133/thumb-440-1331191.webp',
    creator: 'DemonHunter',
    createdAt: '2024-01-02T08:10:00Z',
    likes: 8200,
    comments: [
      { id: 'ct7', user: 'NezukoKick', text: 'Tanjiro always on point!', createdAt: '2024-01-02T08:30:00Z' }
    ],
    tags: ['demon slayer', 'tanjiro', 'breathing styles'],
    isLiked: false
  },
  {
    id: 't8',
    title: 'When Gojo takes off his blindfold',
    imageUrl: 'https://images8.alphacoders.com/133/thumb-440-1331367.webp',
    creator: 'SixEyes',
    createdAt: '2024-02-10T11:45:00Z',
    likes: 14000,
    comments: [
      { id: 'ct8', user: 'JujutsuKing', text: 'The strongest sorcerer is here!', createdAt: '2024-02-10T12:00:00Z' }
    ],
    tags: ['jujutsu kaisen', 'gojo', 'six eyes'],
    isLiked: false
  },
  {
    id: 't9',
    title: 'When Light Yagami writes a name',
    imageUrl: 'https://images2.alphacoders.com/727/thumb-440-727991.webp',
    creator: 'GodOfNewWorld',
    createdAt: '2024-03-05T17:10:00Z',
    likes: 8800,
    comments: [
      { id: 'ct9', user: 'NotebookHolder', text: 'He always has a plan.', createdAt: '2024-03-05T17:30:00Z' }
    ],
    tags: ['death note', 'light yagami', 'kira'],
    isLiked: false
  },
  {
    id: 't10',
    title: 'When Zoro says he won’t lose again',
    imageUrl: 'https://images5.alphacoders.com/132/thumb-440-1325614.webp',
    creator: 'SwordMaster',
    createdAt: '2024-04-01T20:00:00Z',
    likes: 10200,
    comments: [
      { id: 'ct10', user: 'SanjiKicks', text: 'Zoro keeps his word.', createdAt: '2024-04-01T20:15:00Z' }
    ],
    tags: ['one piece', 'zoro', 'swordsman'],
    isLiked: false
  },
  {
    id: 't11',
    title: 'When Itachi activates Mangekyo Sharingan',
    imageUrl: 'https://images6.alphacoders.com/137/thumb-440-1371177.webp',
    creator: 'UchihaLegacy',
    createdAt: '2024-05-12T16:40:00Z',
    likes: 12500,
    comments: [
      { id: 'ct11', user: 'KonohaGhost', text: 'Itachi is just built different.', createdAt: '2024-05-12T16:55:00Z' }
    ],
    tags: ['naruto', 'itachi', 'sharingan'],
    isLiked: false
  },
  {
    id: 't12',
    title: 'When Aizen says “All according to plan”',
    imageUrl: 'https://images7.alphacoders.com/135/thumb-440-1359295.webp',
    creator: 'HogyokuMaster',
    createdAt: '2024-06-20T14:20:00Z',
    likes: 9800,
    comments: [
      { id: 'ct12', user: 'SoulSociety', text: 'Aizen always 10 steps ahead.', createdAt: '2024-06-20T14:40:00Z' }
    ],
    tags: ['bleach', 'aizen', 'hogyoku'],
    isLiked: false
  }
];

const TrendingPage = () => {
  const [memes, setMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating API call delay
    setTimeout(() => {
      setMemes(trendingMemesData);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Loader fullScreen text="Loading trending memes..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <TrendingUp size={28} className="text-red-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900 mt-14">🔥 Trending Memes</h1>
      </div>

      <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-6 mb-8 shadow-md">
        <div className="flex items-start">
          <Flame size={24} className="text-orange-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Hot Right Now</h2>
            <p className="text-gray-700">
              These memes are 🔥! Check out the most popular memes on MemeVerse today.
            </p>
          </div>
        </div>
      </div>

      {memes.length > 0 ? (
        <MemeGrid memes={memes} columns={3} />
      ) : (
        <p className="text-center text-gray-600 text-lg">No trending memes yet! Be the first to upload a viral one. 🚀</p>
      )}
    </div>
  );
};

export default TrendingPage;
