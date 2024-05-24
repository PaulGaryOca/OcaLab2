import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Users from './components/Users'
import CreateUser from './components/CreateUser'
import UupdateSong from './components/UupdateSong'


function App() {
  return (
      <BrowserRouter>
      
        <Routes>
            <Route path='/'  element={<Users/>}></Route>
            <Route path='/upload_song' element={<CreateUser/>}></Route>
            <Route path='/update_song/:id' element={<UupdateSong/>}></Route>
           
            </Routes>
            </BrowserRouter>
  )
}

export default App
