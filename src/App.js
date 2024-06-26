import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Uploadpage from './Components/Uploadpage';
import { ExcelDataProvider } from './Components/ExcelDataContent';
import Login from './Components/Login/Login';
import Mainboard1 from './Components/main/Graph';
function App() {
  
  return (
    <ExcelDataProvider> 
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/upload" element={<Uploadpage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/graph" element={<Mainboard1/>} />
        </Routes>
      </div>
    </Router>
    </ExcelDataProvider>
  );
}

export default App;
