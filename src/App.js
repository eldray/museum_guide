import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtistModels from './pages/Artists/ArtistModels';
import ArtistLogin from './pages/Artists/ArtistLogin';
import ArtistRegistration from './pages/Artists/ArtistRegistration';
import UserRegistration from './pages/Users/UserRegistration';
import ArtistProfile from './pages/Artists/ArtistProfile';
import UserLogin from './pages/Users/UserLogin';
import UserProfile from './pages/Users/UserProfile';
import Favorites from './pages/Users/Favorites';
import ExhibitsList from './pages/ArtWorks/ExhibitsList'; 
import ExhibitDetail from './pages/ArtWorks/ExhibitDetail';
import ArtworksList from './pages/ArtWorks/ArtworksList';  
import ArtworkDetail from './pages/ArtWorks/ArtworkDetail';
import ArtworkSearchInput from './components/ArtworkSearchInput';
import ArtworkSearchResults from './components/ArtworkSearchResults';
import ArtMovements from './pages/ArtWorks/ArtMovements';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/aboutpage" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/artistlogin" element={<ArtistLogin />} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/artistregistration" element={<ArtistRegistration />} />
          <Route path="/artistmodels" element={<ArtistModels />}/>
          <Route path="/userregistration" element={<UserRegistration />} />
          <Route path="/ArtistProfile" element={<ArtistProfile />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/ExhibitsList" element={<ExhibitsList />} />

          <Route path="/exhibits/:id" element={<ExhibitDetail />} />
          <Route path="/ArtworksList" element={<ArtworksList />} />
          <Route path="/artworks/:id" element={<ArtworkDetail />} />
          <Route path="/search" element={<ArtworkSearchInput />} />
          <Route path="/search/results" element={<ArtworkSearchResults />} />
          <Route path="/ArtMovements" element={<ArtMovements/>}/>
          <Route path="/favorites" component={Favorites} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
