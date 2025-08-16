import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Lost from './pages/Lost.jsx'
import Found from './pages/Found.jsx'
import PostItem from './pages/PostItem.jsx'
import ItemDetails from './pages/ItemDetails.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  return (
    <div>
      <Navbar />
      <main className="container-wide py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lost" element={<Lost />} />
          <Route path="/found" element={<Found />} />
          <Route path="/post" element={<PostItem />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <footer className="py-10 text-center text-sm text-gray-500">
        Built with ❤️ for FINDIT
      </footer>
    </div>
  )
}
