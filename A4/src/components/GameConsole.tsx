import { h } from 'preact';
import { I18nWord } from '../state';
import TextInput from './TextInput';
import GamePropertiesInput from './GameProperties';
import ResetButton from './ResetButton';
import GameProgress from './GameProgress';

interface GameConsoleProps {
  gameData: {
    id: number;
    words: I18nWord[];
    consoleContent: string;
    fontSize: number;
    numWords: number;
    matchedWords: Set<string>;
  };
}

const GameConsole = ({ gameData }: GameConsoleProps) => {
  console.log('GameConsole Content:', gameData.consoleContent); // Debug log

  return (
    <div className="h-1/3 border border-black p-2 flex flex-col gap-5">
      <TextInput />
      <GamePropertiesInput />
      <ResetButton />
    </div>
  );
};

export default GameConsole;
