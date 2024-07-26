import { h } from 'preact';
import { useSignalEffect } from '@preact/signals';
import * as State from '../state';
import GameBar from './GameBar';

const RightSide = () => {
  useSignalEffect(() => {
    if (State.selectedGameIndex.value !== null && State.selectedGameIndex.value >= State.games.value.length) {
      State.selectedGameIndex.value = null;
    }
  });

  return (
    <div className="flex flex-col flex-grow p-2 gap-5 h-full w-full md:w-1/3">
      <h2 className="text-lg">Games</h2>
      {State.games.value.length > 0 ? (
        State.games.value.map((game, index) => (
          <GameBar
            key={index}
            game={game}
            index={index}
            onSelect={() => State.selectedGameIndex.value = index}
          />
        ))
      ) : (
        <p>No games available</p>
      )}
    </div>
  );
};

export default RightSide;
