import { h } from 'preact';
import * as State from '../state';
import GameArea from './GameArea';
import GameConsole from './GameConsole';

const LeftSide = () => {
  const selectedGame = State.selectedGameIndex.value !== null ? State.games.value[State.selectedGameIndex.value] : null;

  console.log('Selected Game:', selectedGame); // Debug log

  return (
    <div className="flex flex-col w-full md:w-2/3 h-full border-r border-black">
      {selectedGame ? (
        <>
          <GameArea gameData={selectedGame} />
          <GameConsole gameData={selectedGame} />
        </>
      ) : (
        <div className="flex-grow flex justify-center items-center">
          <p>No game selected</p>
        </div>
      )}
    </div>
  );
};

export default LeftSide;
