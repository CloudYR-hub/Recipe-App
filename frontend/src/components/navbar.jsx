import { Link } from 'react-router-dom'
import './navbar.css'
function NavBar(){
    return(
        <nav className="navbar">
            <Link to="/" className="navbar-logo">🍳 Recipe App</Link>
            <div className="navbar-links">
                <Link to="/create">Create</Link>
                <Link to="/import">Import</Link>
            </div>
        </nav>
    )
}
export default NavBar