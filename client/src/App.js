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
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
