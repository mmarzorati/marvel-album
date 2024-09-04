import './App.css';
import Navbar from './components/Navbar';
import Album from './pages/Album';
import Shop from './pages/Shop';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar/>
      <Router>
        <div class="page-padding">
            <Routes>
              <Route path="/album" element={<Album/>}/>
              <Route path="/shop" element={<Shop/>}/>
            </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
