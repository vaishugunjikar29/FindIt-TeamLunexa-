import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const nav = 'px-3 py-2 rounded-xl hover:bg-gray-100'
  const active = ({isActive}) => isActive ? nav + ' bg-gray-100 font-semibold' : nav

  return (
    <header className="border-b bg-white">
      <div className="container-wide py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight">FINDIT</Link>
        <nav className="flex items-center gap-2 text-sm">
          <NavLink to="/" className={active}>Home</NavLink>
          <NavLink to="/lost" className={active}>Lost</NavLink>
          <NavLink to="/found" className={active}>Found</NavLink>
          <NavLink to="/post" className="btn btn-primary">Post Item</NavLink>
        </nav>
        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <NavLink to="/profile" className={active}>Hi, {user.name}</NavLink>
              <button onClick={logout} className="text-gray-600 hover:text-gray-900">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={active}>Login</NavLink>
              <NavLink to="/register" className="px-3 py-2 rounded-xl bg-gray-900 text-white hover:bg-black">Sign up</NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
