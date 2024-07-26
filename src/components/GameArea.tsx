import { h } from 'preact';
import { useComputed } from '@preact/signals';
import { I18nWord, language, games, selectedGameIndex } from '../state';

interface GameAreaProps {
  gameData?: {
    id: number;
    words: I18nWord[];
    consoleContent: string;
    fontSize: number;
    matchedWords: Set<number>;
  };
}

const GameArea = ({ gameData }: GameAreaProps) => {
  const currentLanguage = useComputed(() => language.value);

  if (!gameData) {
    return (
      <div className="flex flex-col w-full h-2/3 border-r border-black">
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No game data available</p>
        </div>
      </div>
    );
  }

  const currentGame = games.value[selectedGameIndex.value!];
  const matchedWords = currentGame.matchedWords;
  const nextWordToMatchIndex = currentGame.words.findIndex(word => !matchedWords.has(currentGame.words.indexOf(word)));

  const allWordsMatched = matchedWords.size === gameData.words.length;

  return (
    <div className={`flex flex-col w-full h-2/3 border-r border-black overflow-y-auto ${allWordsMatched ? 'bg-green-300' : ''}`}>
      <ul className="flex flex-wrap gap-1 p-2">
        {gameData.words.map((word, index) => {
          const wordText = word[currentLanguage.value];
          const isMatched = matchedWords.has(index);
          const isNextToMatch = index === nextWordToMatchIndex;

          return (
            <li
              key={index}
              className={`p-2 m-1 border rounded text-black ${isMatched ? 'bg-green-300' : isNextToMatch ? 'bg-yellow-300' : 'bg-gray-100'}`}
              style={{ fontSize: `${gameData.fontSize}px` }}
            >
              {wordText}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GameArea;
