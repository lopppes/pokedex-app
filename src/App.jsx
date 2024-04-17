import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Page from './components/Page'
import PokemonDetailed from './components/PokemonDetailed'
import ProtectedRoutes from './components/ProtectedRoutes'
import NotFound from './components/NotFound'


function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path='/pokedex/notfound' element={<NotFound />}/>
            <Route path='/pokedex' element={<Page />}/>
            <Route path='/pokedex/:pokeId' element={<PokemonDetailed />}/>
          </Route>
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
