import logo from './logo.svg';
import './App.css';
import FamilyTree from './pages/familyTree/FamilyTree';
import LayoutFlow from './pages/familyTree/LayoutFlow';
import { ReactFlowProvider } from 'reactflow';
import LayoutFlowCust from './pages/familyTree/LayoutFlowCust';
import D3Fam from './pages/d3-multi/d3FamTree';
import TreeChart from './pages/d3-multi/d3FamTree';
import PageRouter from './pages/PageRouter';

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
      {/* <TreeChart/> */}
      {/* <div style={{ width: '100vw', height: '100vh' }} >
      <ReactFlowProvider>
      <LayoutFlowCust/>
      </ReactFlowProvider>
      </div> */}
      <PageRouter/>
    </div>
  );
}

export default App;
