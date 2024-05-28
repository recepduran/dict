import { useState } from 'react';
import './App.css';
import { LeftBar } from './LeftBar';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SearchWord from './SearchWord';
import RandomWord from './RandomWord';
import Home from './Home';
import { MainContext } from './context';

function App() {
  const [history, setHistory] = useState([]);

  const data = {
    history,
    setHistory,
  };

  return (
    <MainContext.Provider value={data}>
      <div className="container">
        <LeftBar />

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<SearchWord />} />
          <Route path="randomword" element={<RandomWord />} />
        </Routes>
      </div>
    </MainContext.Provider>
  );
}

export default App;
