import './App.css';

import HomePage from './pages/home';
import ErrorBoundry from './util/error-boundry';

function App() {
  return (
    <div className="App">
      <ErrorBoundry>
        <HomePage />
      </ErrorBoundry>
    </div>
  );
}

export default App;
