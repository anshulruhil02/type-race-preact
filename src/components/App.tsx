import { h } from 'preact';
import Toolbar from './Toolbar';
import LeftSide from './LeftSide'
import RightSide from './RightSide';

const App = () => {
  return (
    <div id="app" className="h-screen w-screen flex flex-col">
      <Toolbar />
      <div className="flex flex-grow h-full w-full">
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
};

export default App;
