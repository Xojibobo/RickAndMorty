import './components/Header.css'
import './Characters.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Characters from './Characters'
import Episode from './Episode'
import Location from './Location'
import SelectedCharacter from './SelectedCharacter'
import './SelectedCharacter.css'
import './Episode.css'


export default function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Characters />}></Route>
          <Route path='/episode' element={<Episode />}></Route>
          <Route path='/location' element={<Location />}></Route>
          <Route path='/selectedCharacters/:id' element={<SelectedCharacter />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

