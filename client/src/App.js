import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Detail from "./components/Detail";
import Home from './components/Home'
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
          {/* <div className="App">
            <header className="App-header">
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
            </header>
          </div> */}
        {/* </Route> */}
        <Route path="/about" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
