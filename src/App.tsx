import './App.css';
import { useAtom, useAtomValue } from 'jotai';
import { ffcFlagsAtom } from './ffc/atoms';
import Counter from './counter/counter';

function App() {
  const ffcFlags = useAtomValue<any>(ffcFlagsAtom);

  return (
    <div className="App">
      <header className="App-header">
        <div>Hello { ffcFlags["hello"] } </div>
        { ffcFlags["counter"] === 'true' ?  <Counter /> : ''}
      </header>
    </div>
  );
}

export default App;
