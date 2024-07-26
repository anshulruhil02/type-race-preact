import { h } from 'preact';
import { I18nWord } from '../state';
import TextInput from './TextInput';
import GamePropertiesInput from './GameProperties';
import ResetButton from './ResetButton';
import GameProgressMatchedWords from './GameProgressMatchedWords';

interface GameConsoleProps {
  gameData?: {
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
  if (!gameData) {
    return (
      <div className="border border-black p-2 flex flex-col gap-5 h-1/3">
        <TextInput disabled />
        <GamePropertiesInput disabled />
        <ResetButton disabled />
        <GameProgressMatchedWords matchedWords={0} totalWords={0} />
      </div>
    );
  }

  return (
    <div className="border border-black p-2 flex flex-col gap-5 h-1/3">
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
