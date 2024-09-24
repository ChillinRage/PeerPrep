import { Route, Routes } from "react-router-dom";
import logo from './styles/logo.svg';
import './styles/App.css';
import { Home, Problems } from './pages';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems />} />
      </Routes>
    </div>
  );
}

export default App;
