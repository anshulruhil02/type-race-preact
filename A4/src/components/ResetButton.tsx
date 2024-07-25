import { h } from 'preact';
import { selectedGameIndex, resetGame, games  } from '../state';
import { useComputed } from '@preact/signals';

const ResetButton = () => {
  const selectedGame = useComputed(() => selectedGameIndex.value !== null ? games.value[selectedGameIndex.value] : null);

  const handleReset = () => {
    if (selectedGame.value !== null) {
      resetGame(selectedGame.value.id);
    }
  };

  return (
    <button className="w-full bg-red-500 text-white p-2 rounded" onClick={handleReset}>
      Reset
    </button>
  );
};

export default ResetButton;
