import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import BacklogD from './pages/BacklogD';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux'
import Videogame from './pages/Videogame';



function App() {
  const user = useSelector(state => state.user.userInfo)


  return (
    <div className="app">
      <Router>
        <NavBar />
        {!user && <Home />}
        {user && (<Routes>
          <Route path='/' element={<BacklogD />} />
          <Route path='/edit/:id' element={<Videogame/>} />
        </Routes>)}
      </Router>
    </div>

  );
}

export default App;
