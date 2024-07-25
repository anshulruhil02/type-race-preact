import { h } from 'preact';

interface GameProgressProps {
  completionPercentage: number;
}

const GameProgress = ({ completionPercentage }: GameProgressProps) => {
  return (
    <div className="w-full p-2 bg-gray-200 border border-gray-400 rounded">
      <div className="w-full bg-gray-300 rounded">
        <div
          className="bg-green-500 text-white text-xs leading-none py-1 text-center rounded"
          style={{ width: `${completionPercentage}%` }}
        >
          {completionPercentage.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default GameProgress;
