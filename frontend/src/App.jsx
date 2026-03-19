import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Create from './pages/create.jsx'
import Home from './pages/home.jsx'
import Import from './pages/import.jsx'
import Login from './pages/login.jsx'
import Recipe from './pages/recipe.jsx'
import Register from './pages/register.jsx'
import NavBar from './components/navbar.jsx'

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create" element={<Create/>}/>
          <Route path="/import" element={<Import/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/recipe/:id" element={<Recipe/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App