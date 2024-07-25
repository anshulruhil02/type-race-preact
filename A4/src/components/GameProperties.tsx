import { h } from 'preact';
import { useComputed } from '@preact/signals';
import { updateNumWords, updateFontSize, games, selectedGameIndex } from '../state';

const GamePropertiesInput = () => {
  const selectedGame = useComputed(() => selectedGameIndex.value !== null ? games.value[selectedGameIndex.value] : null);

  const handleNumWordsChange = (e: Event) => {
    if (selectedGame.value) {
      const newNumWords = parseInt((e.currentTarget as HTMLInputElement).value, 10);
      updateNumWords(selectedGame.value.id, newNumWords);
    }
  };

  const handleFontSizeChange = (e: Event) => {
    if (selectedGame.value) {
      const newFontSize = parseInt((e.currentTarget as HTMLInputElement).value, 10);
      updateFontSize(selectedGame.value.id, newFontSize);
    }
  };

  return (
    <div className="flex gap-2">
      <div className="flex-1 flex items-center gap-2">
        <label className="whitespace-nowrap">Font Size</label>
        <input type="range" min="0" max="100" className="flex-1" value={selectedGame.value?.fontSize || 16} onInput={handleFontSizeChange} />
      </div>
      <div className="flex-1 flex items-center gap-2">
        <label className="whitespace-nowrap">Num Words</label>
        <input type="number" min="0" max="9999" className="flex-1" value={selectedGame.value?.numWords || 10} onInput={handleNumWordsChange} />
      </div>
    </div>
  );
};

export default GamePropertiesInput;
