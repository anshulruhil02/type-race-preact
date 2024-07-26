import { h } from 'preact';
import * as State from '../state';
import GameArea from './GameArea';
import GameConsole from './GameConsole';

const LeftSide = () => {
  const selectedGame = State.selectedGameIndex.value !== null ? State.games.value[State.selectedGameIndex.value] : null;

  console.log('Selected Game:', selectedGame); // Debug log

  return (
    <div className="flex flex-col w-full md:w-2/3 h-screen border-r border-black">
      {selectedGame ? (
        <>
          <GameArea gameData={selectedGame} />
          <GameConsole gameData={selectedGame} />
        </>
      ) : (
        <>
          <GameArea />
          <GameConsole />
        </>
      )}
    </div>
  );
};

export default LeftSide;

