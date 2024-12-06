import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/navigation/Navigation';
import { BookingForm } from './components/BookingForm';
import { Features } from './components/Features';
import { Gallery } from './components/Gallery';
import { Location } from './components/Location';
import { Boat } from './components/Boat';
import { InfiniteCarousel } from './components/carousel/InfiniteCarousel';
import { Footer } from './components/Footer';
import { Chat } from './components/chat/Chat';
import { ChatProvider } from './components/chat/ChatProvider';
import { MapProvider } from './components/map/MapProvider';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { AdminLogin } from './pages/auth/AdminLogin';
import { Dashboard } from './pages/admin/Dashboard';
import { Experience } from './pages/Experience';
import { PostPage } from './pages/PostPage';
import { Hero } from './components/Hero';

function Home() {
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');
  const [guests, setGuests] = React.useState('2');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-caribbean-50">
      <Navigation />
      <Hero
        startDate={startDate}
        endDate={endDate}
        guests={guests}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onGuestsChange={setGuests}
      />
      <Features />
      <Gallery />
      <Boat />
      <Location />
      <InfiniteCarousel />
      <Footer />
      <Chat />
    </div>
  );
}

function App() {
  return (
    <ChatProvider>
      <MapProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/experience/:slug" element={<PostPage />} />
          </Routes>
        </Router>
      </MapProvider>
    </ChatProvider>
  );
}

export default App;