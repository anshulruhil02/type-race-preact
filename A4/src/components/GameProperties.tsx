import { h } from 'preact';
import { games, selectedGameIndex, updateFontSize, updateNumWords } from '../state';

const GamePropertiesInput = () => {
  const game = games.value[selectedGameIndex.value!];

  const handleFontSizeChange = (e: Event) => {
    const fontSize = parseInt((e.target as HTMLInputElement).value, 10);
    updateFontSize(game.id, fontSize);
  };

  const handleNumWordsChange = async (e: Event) => {
    const numWords = parseInt((e.target as HTMLInputElement).value, 10);
    await updateNumWords(game.id, numWords);
  };

  return (
    <div className="flex gap-2">
      <div className="flex-1 flex items-center gap-2">
        <label className="whitespace-nowrap">Font Size</label>
        <input
          type="range"
          min="0"
          max="100"
          value={game.fontSize}
          onChange={handleFontSizeChange}
          className="flex-1"
        />
      </div>
      <div className="flex-1 flex items-center gap-2">
        <label className="whitespace-nowrap">Num Words</label>
        <input
          type="number"
          min="0"
          max="9999"
          value={game.numWords}
          onChange={handleNumWordsChange}
          className="flex-1"
        />
      </div>
    </div>
  );
};

export default GamePropertiesInput;
