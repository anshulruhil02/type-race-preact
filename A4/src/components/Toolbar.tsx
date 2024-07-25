import { h } from 'preact';
import { addGame, deleteGame, clearGames, canAddGame, canDeleteGame, canClearGames, language, setLanguage } from '../state';

const Toolbar = () => {
  return (
    <div className="h-12 bg-lightgray border-b border-black p-2 w-full flex justify-between items-center">
      <div className="flex gap-2">
        <button 
          className="w-36 bg-blue-500 text-white p-2 rounded"
          onClick={addGame}
          disabled={!canAddGame.value}
        >
          Add Game
        </button>
        <button 
          className="w-36 bg-red-500 text-white p-2 rounded"
          onClick={deleteGame}
          disabled={!canDeleteGame.value}
        >
          Delete Game
        </button>
        <button 
          className="w-36 bg-yellow-500 text-white p-2 rounded"
          onClick={clearGames}
          disabled={!canClearGames.value}
        >
          Clear Games
        </button>
      </div>
      <div className="flex gap-2">
        <button className="w-36 bg-gray-500 text-white p-2 rounded">Undo</button>
        <button className="w-36 bg-gray-500 text-white p-2 rounded">Redo</button>
        <select 
          className="w-36 bg-white p-2 rounded border border-black"
          value={language.value}
          onChange={(e) => setLanguage(e.currentTarget.value)}
        >
          <option value="en-CA">English</option>
          <option value="fr-CA">Français</option>
        </select>
      </div>
    </div>
  );
};

export default Toolbar;
