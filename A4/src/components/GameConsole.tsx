import { h } from 'preact';
import { I18nWord } from '../state';
import TextInput from './TextInput';
import GamePropertiesInput from './GameProperties';
import ResetButton from './ResetButton';
import GameProgress from './GameProgress';
import GameProgressMatchedWords from './GameProgressMatchedWords';

interface GameConsoleProps {
  gameData: {
    id: number;
    words: I18nWord[];
    consoleContent: string;
    fontSize: number;
    numWords: number;
    matchedWords: Set<number>;
    progressPercentage: number;
  };
}

const GameConsole = ({ gameData }: GameConsoleProps) => {
  const completionPercentage = (gameData.matchedWords.size / gameData.words.length) * 100;

  return (
    <div className="h-1/3 border border-black p-2 flex flex-col gap-5">
      <TextInput />
      <GamePropertiesInput />
      <ResetButton />
      <GameProgressMatchedWords 
        matchedWords={gameData.matchedWords.size} 
        totalWords={gameData.words.length} 
      />
    </div>
  );
};

export default GameConsole;
