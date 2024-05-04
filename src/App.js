import logo from './logo.svg';
import './App.css';
import FamilyTree from './pages/familyTree/FamilyTree';
import LayoutFlow from './pages/familyTree/LayoutFlow';
import { ReactFlowProvider } from 'reactflow';
import LayoutFlowCust from './pages/familyTree/LayoutFlowCust';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <FamilyTree/>
      {/* <div style={{ width: '100vw', height: '100vh' }} >
      <ReactFlowProvider>
      <LayoutFlowCust/>
      </ReactFlowProvider>
      </div> */}
    </div>
  );
}

export default App;
