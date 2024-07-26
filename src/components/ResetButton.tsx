import { h } from 'preact';
import { resetGame, games, selectedGameIndex } from '../state';

const ResetButton = ({ disabled }: { disabled?: boolean }) => {
  const handleReset = async () => {
    if (selectedGameIndex.value !== null && !disabled) {
      await resetGame(games.value[selectedGameIndex.value].id);
    }
  };

  return (
    <button
      onClick={handleReset}
      className="w-full bg-red-500 text-white p-2 rounded"
      disabled={disabled}
    >
      Reset
    </button>
  );
};

export default ResetButton;
