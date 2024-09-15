import { BrowserRouter, Routes, Route } from 'react-router-dom';
import URLGetter from './Components/URLGetter';
import Home from './Components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path=':urlSuffix' element={<URLGetter/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
