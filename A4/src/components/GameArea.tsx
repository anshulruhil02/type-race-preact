import { h } from 'preact';
import { useComputed } from '@preact/signals';
import { I18nWord, language, games, selectedGameIndex } from '../state';

interface GameAreaProps {
  gameData: {
    id: number;
    words: I18nWord[];
    consoleContent: string;
    fontSize: number;
    matchedWords: Set<string>;
  };
}

const GameArea = ({ gameData }: GameAreaProps) => {
  const currentLanguage = useComputed(() => language.value);
  const currentGame = games.value[selectedGameIndex.value!];
  const matchedWords = currentGame.matchedWords;
  const nextWordToMatch = currentGame.words.find(word => !matchedWords.has(word[currentLanguage.value]));

  return (
    <div className="flex-grow border border-black overflow-y-auto" style={{ maxHeight: '400px' }}>
      <ul className="flex flex-wrap gap-1 p-2">
        {gameData.words.map((word, index) => {
          const wordText = word[currentLanguage.value];
          const isMatched = matchedWords.has(wordText);
          const isNextToMatch = nextWordToMatch && nextWordToMatch[currentLanguage.value] === wordText;

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
