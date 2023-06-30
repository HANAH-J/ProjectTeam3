import MainPage from "./pages/main/MainPage";
import { Routes, Route } from 'react-router-dom';
import "./App.css";
import UserProfile from './pages/profile/UserProfile/UserProfile';
import UserScoreCollection from './pages/profile/UserScoreCollection/UserScoreCollection';
import MovieToWatch from './pages/profile/MovieToWatch/MovieToWatch';
import MovieCollection from './pages/profile/MovieCollection/MovieCollection';



function App() {
  return (
    <div className="App">
        
        <Routes>
          <Route path="/" Component={MainPage}/>
          <Route path="/userProfile" Component={UserProfile} />
          <Route path="/userScoreCollection" element={<UserScoreCollection/>} />
          <Route path="/movieToWatch" element={<MovieToWatch/>} />
          <Route path="/movieCollection" element={<MovieCollection/>} />
        </Routes>
    </div>
  );
}

export default App;
