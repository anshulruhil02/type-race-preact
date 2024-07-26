import { h } from 'preact';
import { GameData, selectedGameIndex } from '../state';
import GameProgress from './GameProgress';

interface GameBarProps {
  game: GameData;
  index: number;
  onSelect: () => void;
}

const GameBar = ({ game, index, onSelect }: GameBarProps) => {
  return (
    <div
      className={`p-2 border ${selectedGameIndex.value === index ? 'border-red-500' : 'border-black'} cursor-pointer`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-center">
        <span>Game {game.id}</span>
        <GameProgress completionPercentage={game.progressPercentage} />
      </div>
    </div>
  );
};

export default GameBar;
