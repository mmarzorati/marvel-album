import './App.css';
import Navbar from './components/Navbar';
import Album from './pages/Album';
import Shop from './pages/Shop';
import Profile from './pages/Profile';
import Character from './pages/Character';
import All from './pages/All';
import Trades from './pages/Trades';
import SignIn from './pages/SignIn.js';
import LogIn from './pages/Login.js'
import CardDetail from './pages/CardDetail';
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
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/character" element={<Character/>}/>
              <Route path="/all" element={<All/>}/>
              <Route path="/trades" element={<Trades/>}/>
              <Route path="/signin" element={<SignIn/>}/>
              <Route path="/login" element={<LogIn/>}/>
              <Route path="/card/:cardName" element={<CardDetail />} />
              <Route path="*" element={<LogIn/>} />
            </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
